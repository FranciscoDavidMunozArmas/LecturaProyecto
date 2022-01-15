import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
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

interface User {
    email: string,
    password: string,
}

function LoginPage() {

    const [counter, setcounter] = useState(0);
    const [user, setuser] = useState<User>({ email: "", password: "" });

    useEffect(() => {
        return () => { }
    })

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user);
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setuser({ ...user, [event.target.name]: event.target.value });
    }

    return (
        <div style={style.container}>

            <Title title={LOGIN} start={true} />

            <form style={style.form} onSubmit={onSubmit}>
                <InputText hint='Correo' type='email' name="email" help={EMAIL_INPUT_HELP} onChange={onChange}/>
                <InputText hint='Contraseña' type='password' name="password" help={PASSWORD_INPUT_HELP} onChange={onChange}/>
                <Button text={LOGIN} type="submit" />
            </form>

            <LinkComponent text={REGISTER} />
            {/* <LinkComponent text={FORGOT_PASSWORD} /> */}
        </div>
    )
}

export default LoginPage
