import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";
import { createUser } from '../auth/auth';
import Button from '../components/Button';
import InputText from '../components/InputText';
import LinkComponent from '../components/LinkComponent';
import Title from '../components/Title';
import { toastManager } from '../libs/toastManager';
import { checkPassword, EMAIL_INPUT_HELP, LOGIN, PASSWORD_CONFIRM_INPUT_HELP, PASSWORD_DONT_MATCH, PASSWORD_INPUT_HELP, PASSWORD_LENGTH_ERROR, PATH_LOGIN, REGISTER, REGISTER_ERROR, VOICE_ES } from '../libs/utils';
import { createStudent } from '../services/student.service';
import { studentConverter } from '../models/Student';
import { checkToken } from '../libs/tokenInterceptor';
import LoadingContainer from '../components/LoadingContainer';

const style = {
    container: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as const
    },
    form: {
        width: "100%",
        maxWidth: "400px",
    }
}

interface User {
    name: string,
    surname: string,
    email: string,
    password: string,
    confirm: string,
}


function RegisterPage() {

    const [loading, setloading] = useState<boolean>(false);

    const navigate = useNavigate();

    const [user, setuser] = useState<User>({ email: "", password: "", confirm: "", name: "", surname: "" });
    const { speak, cancel } = useSpeechSynthesis();

    useEffect(() => {
        if (checkToken()) {
            navigate("/earlearning");
        }
        return () => { }
    });

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setloading(true);
        if (user.password !== user.confirm) {
            toastManager.error(PASSWORD_DONT_MATCH);
            onSpeak(PASSWORD_DONT_MATCH);
            setloading(false);
            return;
        }
        if (!checkPassword(user.password)) {
            toastManager.error(PASSWORD_LENGTH_ERROR);
            onSpeak(PASSWORD_LENGTH_ERROR);
            setloading(false);
            return;
        }
        if (user.name === "" || user.surname === "") {
            toastManager.error("Introduce tu nombre y apellido");
            onSpeak("Introduce tu nombre y apellido");
            setloading(false);
            return;
        }
        const response = await createUser(user.email, user.password);
        if (response) {
            createStudent(response, studentConverter.fromJSON(user));
            navigate(PATH_LOGIN);
        } else {
            toastManager.error(REGISTER_ERROR);
            onSpeak(REGISTER_ERROR);
        }
        setloading(false);
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setuser({ ...user, [event.target.name]: event.target.value });
    }

    return (
        <>
            <LoadingContainer show={loading} />
            <div style={style.container}>

                <Title title={REGISTER} start={true} />

                <form style={style.form} onSubmit={onSubmit}>
                    <InputText hint='Nombre' type='text' name="name" help={"Introduce tu nombre"} onChange={onChange} />
                    <InputText hint='Apellido' type='text' name="surname" help={"Introduce tu apellido"} onChange={onChange} />
                    <InputText hint='Correo' type='email' name="email" help={EMAIL_INPUT_HELP} onChange={onChange} />
                    <InputText hint='Contraseña' type='password' name="password" help={PASSWORD_INPUT_HELP} onChange={onChange} />
                    <InputText hint='Confirmar Contraseña' type='password' name="confirm" help={PASSWORD_CONFIRM_INPUT_HELP} onChange={onChange} />
                    <Button text={REGISTER} type="submit" />
                </form>

                <LinkComponent text="INICIAR SESION" path={PATH_LOGIN} />
                {/* <LinkComponent text={FORGOT_PASSWORD} /> */}
            </div>
        </>
    )
}

export default RegisterPage
