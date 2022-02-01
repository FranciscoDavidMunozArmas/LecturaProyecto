import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useEffect } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";
import { authUser } from '../auth/auth';
import Button from '../components/Button'
import InputText from '../components/InputText'
import LinkComponent from '../components/LinkComponent'
import Title from '../components/Title'
import { toastManager } from '../libs/toastManager';
import { checkPassword, EMAIL_INPUT_HELP, FORGOT_PASSWORD, LOGIN, LOGIN_ERROR, PASSWORD_INPUT_HELP, PASSWORD_LENGTH_ERROR, PATH_EARLEANING, PATH_REGISTER, REGISTER, TAB_KEY, UNFILL_MAIL_ERROR, UNFILL_PASSWORD_ERROR, VOICE_ES } from '../libs/utils'
import { authorize } from '../services/user.service';
import { checkToken, decodeToken, setUpToken } from '../libs/tokenInterceptor';
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
    email: string,
    password: string,
}

function LoginPage() {

    const [user, setuser] = useState<User>({ email: "", password: "" });
    const [loading, setloading] = useState<boolean>(false);
    const { speak, cancel } = useSpeechSynthesis();

    const navigate = useNavigate();

    useEffect(() => {
        if (checkToken()) {
            navigate("/earlearning");
        }
        return () => { }
    })

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setloading(true);
        if (user.password === "") {
            setloading(false);
            onSpeak(UNFILL_PASSWORD_ERROR);
            toastManager.error(UNFILL_PASSWORD_ERROR);
            return;
        }
        if (user.email === "") {
            setloading(false);
            onSpeak(UNFILL_MAIL_ERROR);
            toastManager.error(UNFILL_MAIL_ERROR);
            return;
        }
        if (!checkPassword(user.password)) {
            setloading(false);
            onSpeak(PASSWORD_LENGTH_ERROR);
            toastManager.error(PASSWORD_LENGTH_ERROR);
            return;
        }
        const response = await authUser(user.email, user.password);
        if (response) {
            try {
                const token = await authorize(response);
                if (token.data) {
                    setloading(false);
                    setUpToken(token.data);
                    console.log(decodeToken(token.data));
                    navigate(PATH_EARLEANING);
                }
            } catch (error: any) {
                setloading(false);
                onSpeak(LOGIN_ERROR);
                toastManager.error(LOGIN_ERROR);
            }
        } else {
            setloading(false);
            onSpeak(LOGIN_ERROR);
            toastManager.error(LOGIN_ERROR);
            return;
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setuser({ ...user, [event.target.name]: event.target.value });
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <>
            <LoadingContainer show={loading} />
            <div style={style.container}>

                <Title title={LOGIN} start={true} />

                <form style={style.form} onSubmit={onSubmit}>
                    <InputText hint='Correo' type='email' name="email" help={EMAIL_INPUT_HELP} onChange={onChange} />
                    <InputText hint='Contraseña' type='password' name="password" help={PASSWORD_INPUT_HELP} onChange={onChange} />
                    <Button text={LOGIN} type="submit" />
                </form>

                <LinkComponent text={REGISTER} path={PATH_REGISTER} />
                {/* <LinkComponent text={FORGOT_PASSWORD} /> */}
            </div>
        </>
    )
}

export default LoginPage
