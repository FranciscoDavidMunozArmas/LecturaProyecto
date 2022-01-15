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
import { checkPassword, EMAIL_INPUT_HELP, FORGOT_PASSWORD, LOGIN, LOGIN_ERROR, PASSWORD_INPUT_HELP, PASSWORD_LENGTH_ERROR, REGISTER, TAB_KEY, UNFILL_MAIL_ERROR, UNFILL_PASSWORD_ERROR, VOICE_ES } from '../libs/utils'
import { authorize } from '../services/user.service';
import { setUpToken } from '../libs/tokenInterceptor';

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
    const { speak, cancel } = useSpeechSynthesis();

    const navigate = useNavigate();

    useEffect(() => {
        return () => { }
    })

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(user.password === "") {
            onSpeak(UNFILL_PASSWORD_ERROR);
            toastManager.error(UNFILL_PASSWORD_ERROR);
            return;
        }
        if(user.email === "") {
            onSpeak(UNFILL_MAIL_ERROR);
            toastManager.error(UNFILL_MAIL_ERROR);
            return;
        }
        if(!checkPassword(user.password)) {
            onSpeak(PASSWORD_LENGTH_ERROR);
            toastManager.error(PASSWORD_LENGTH_ERROR);
            return;
        }
        const response = await authUser(user.email, user.password);
        if(response) {
            const token = await authorize(response);
            if(token.data) {
                setUpToken(token.data);
            }
            // if(token) {
            //     setUpToken(token);
            //     navigate("/earlearning");
            // }
        } else {
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
        <div style={style.container}>

            <Title title={LOGIN} start={true} />

            <form style={style.form} onSubmit={onSubmit}>
                <InputText hint='Correo' type='email' name="email" help={EMAIL_INPUT_HELP} onChange={onChange}/>
                <InputText hint='Contraseña' type='password' name="password" help={PASSWORD_INPUT_HELP} onChange={onChange}/>
                <Button text={LOGIN} type="submit" />
            </form>

            <LinkComponent text={REGISTER} path='/register' />
            {/* <LinkComponent text={FORGOT_PASSWORD} /> */}
        </div>
    )
}

export default LoginPage
