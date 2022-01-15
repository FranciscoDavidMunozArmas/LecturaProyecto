import React from 'react'
import Button from '../components/Button'
import InputText from '../components/InputText'
import Title from '../components/Title'
import { EMAIL_INPUT_HELP, LOGIN, LOGIN_ERROR, PASSWORD_INPUT_HELP } from '../libs/utils'

const style = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const
}

function LoginPage() {
    return (
        <div style={style}>
            <Title title={LOGIN} />
            <InputText hint='Correo' type='email' help={EMAIL_INPUT_HELP}/>
            <InputText hint='Contraseña' type='password' help={PASSWORD_INPUT_HELP}/>
            <Button text={LOGIN} />
        </div>
    )
}

export default LoginPage
