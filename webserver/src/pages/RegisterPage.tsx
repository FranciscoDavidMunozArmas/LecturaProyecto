import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Button from '../components/Button';
import InputText from '../components/InputText';
import LinkComponent from '../components/LinkComponent';
import Title from '../components/Title';
import { EMAIL_INPUT_HELP, LOGIN, PASSWORD_CONFIRM_INPUT_HELP, PASSWORD_INPUT_HELP, REGISTER } from '../libs/utils';

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

            <Title title={REGISTER} start={true} />

            <form style={style.form} onSubmit={onSubmit}>
                <InputText hint='Correo' type='email' name="email" help={EMAIL_INPUT_HELP} onChange={onChange}/>
                <InputText hint='Contraseña' type='password' name="password" help={PASSWORD_INPUT_HELP} onChange={onChange}/>
                <InputText hint='Contraseña' type='password' name="confirm" help={PASSWORD_CONFIRM_INPUT_HELP} onChange={onChange}/>
                <Button text={REGISTER} type="submit" />
            </form>

            <LinkComponent text="Iniciar Sesion"/>
            {/* <LinkComponent text={FORGOT_PASSWORD} /> */}
        </div>
    )
}

export default RegisterPage
