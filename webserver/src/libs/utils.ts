import moment from 'moment';
// import path from 'path';

// const extensionName = ".mp3";

//Strings
export const MAIL = "CORREO";
export const PASSWORD = "CONTRASEÑA";
export const LOGIN = "INICIAR SESIÓN";
export const REGISTER = "REGISTRARSE";
export const FORGOT_PASSWORD = "¿OLVIDÓ SU CONTRASEÑA?";
export const LOGIN_ERROR = "Error al iniciar sesión";
export const REGISTER_ERROR = "Error al registrar";
export const FORGOT_PASSWORD_ERROR = "Error al recuperar contraseña";
export const EMAIL_INPUT_HELP = "Ingrese su correo electrónico";
export const PASSWORD_INPUT_HELP = "Baje el volumen del dispositivo e ingrese la contraseña";
export const PASSWORD_CONFIRM_INPUT_HELP = "Baje el volumen del dispositivo e ingrese la contraseña";
//Keys
export const ENTER_KEY = 13;
export const TAB_KEY = 9;
//Voices
export const VOICE_ES = window.speechSynthesis.getVoices()[6] as SpeechSynthesisVoice;
export const VOICE_EN = window.speechSynthesis.getVoices()[0] as SpeechSynthesisVoice;
//Constants
export const CONSTANTS = {
    API_URI: process.env.REACT_APP_API_URI || process.env.API_URI,
    SECRET_KEY: process.env.REACT_APP_SECRET_KEY || process.env.SECRET_KEY,
    TOKEN_NAME: process.env.REACT_APP_TOKEN_NAME || process.env.TOKEN_NAME,
    API_VERSION: process.env.REACT_APP_API_VERSION || process.env.API_VERSION,
    API_PREFIX: process.env.REACT_APP_API_PREFIX || process.env.API_PREFIX,
    FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
};

export const URI = `${CONSTANTS.API_URI}/${CONSTANTS.API_PREFIX}/${CONSTANTS.API_VERSION}`;

export const ROLES = ["student", "teacher", "admin"];

export const passwordGenerator = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

export const formatNumber = (number: number, decimals: number) => {
    return number.toFixed(decimals);
};

export const formatDate = (date: Date) => {
    return moment(date).format("YYYY/MM/DD");
}

// export const checkExtension = (file: string) => {
//     const extension = path.extname(file);
//     return (extension as string === extensionName);
// }