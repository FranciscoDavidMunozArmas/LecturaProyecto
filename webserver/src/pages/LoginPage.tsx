import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import useKeypress from 'react-use-keypress';
import Button from '../components/Button'
import InputText from '../components/InputText'
import LinkComponent from '../components/LinkComponent'
import Title from '../components/Title'
import { EMAIL_INPUT_HELP, FORGOT_PASSWORD, LOGIN, LOGIN_ERROR, PASSWORD_INPUT_HELP, REGISTER, TAB_KEY } from '../libs/utils'

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

function LoginPage() {

    const [counter, setcounter] = useState(0)

    const titleRef = useRef<HTMLElement>();
    const mailRef = useRef<HTMLElement>();
    const passwordRef = useRef<HTMLElement>();
    const buttonRef = useRef<HTMLElement>();
    const forgotPasswordRef = useRef<HTMLElement>();
    const registerRef = useRef<HTMLElement>();

    useEffect(() => {
        return () => { }
    })

    return (
        <div style={style.container}>

            <form style={style.form}>
                <Title title={LOGIN} ref={titleRef} />
                <InputText hint='Correo' type='email' help={EMAIL_INPUT_HELP} ref={mailRef} />
                <InputText hint='Contraseña' type='password' help={PASSWORD_INPUT_HELP} ref={passwordRef} />
                <Button text={LOGIN} ref={buttonRef} />
            </form>

            <LinkComponent text={REGISTER} ref={forgotPasswordRef} />
            <LinkComponent text={FORGOT_PASSWORD} ref={registerRef} />
        </div>
    )
}

export default LoginPage
