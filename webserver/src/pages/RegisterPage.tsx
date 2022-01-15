import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import Button from '../components/Button';
import InputText from '../components/InputText';
import LinkComponent from '../components/LinkComponent';
import Title from '../components/Title';
import { toastManager } from '../libs/toastManager';
import { checkPassword, EMAIL_INPUT_HELP, LOGIN, PASSWORD_CONFIRM_INPUT_HELP, PASSWORD_DONT_MATCH, PASSWORD_INPUT_HELP, PASSWORD_LENGTH_ERROR, REGISTER, VOICE_ES } from '../libs/utils';

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
    email: string,
    password: string,
    confirm: string,
}


function RegisterPage() {
    const [user, setuser] = useState<User>({ email: "", password: "", confirm: "" });

    const { speak, cancel } = useSpeechSynthesis();

    useEffect(() => {
        return () => { }
    });

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user.password !== user.confirm) {
            toastManager.error(PASSWORD_DONT_MATCH);
            onSpeak(PASSWORD_DONT_MATCH);
            return;
        }
        if(!checkPassword(user.password)){
            toastManager.error(PASSWORD_LENGTH_ERROR);
            onSpeak(PASSWORD_LENGTH_ERROR);
            return;
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setuser({ ...user, [event.target.name]: event.target.value });
    }

    return (
        <div style={style.container}>

            <Title title={REGISTER} start={true} />

            <form style={style.form} onSubmit={onSubmit}>
                <InputText hint='Correo' type='email' name="email" help={EMAIL_INPUT_HELP} onChange={onChange}/>
                <InputText hint='Contraseña' type='password' name="password" help={PASSWORD_INPUT_HELP} onChange={onChange}/>
                <InputText hint='Confirmar Contraseña' type='password' name="confirm" help={PASSWORD_CONFIRM_INPUT_HELP} onChange={onChange}/>
                <Button text={REGISTER} type="submit" />
            </form>

            <LinkComponent text="INICIAR SESION" path='/login'/>
            {/* <LinkComponent text={FORGOT_PASSWORD} /> */}
        </div>
    )
}

export default RegisterPage
