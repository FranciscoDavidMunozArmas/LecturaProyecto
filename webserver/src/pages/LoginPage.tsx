import React from 'react'
import InputText from '../components/InputText'
import { EMAIL_INPUT_HELP, PASSWORD_INPUT_HELP } from '../libs/utils'

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
            <h5>Hello</h5>
            <InputText hint='Correo' type='email' help={EMAIL_INPUT_HELP}/>
            <InputText hint='Contraseña' type='password' help={PASSWORD_INPUT_HELP}/>
        </div>
    )
}

export default LoginPage
