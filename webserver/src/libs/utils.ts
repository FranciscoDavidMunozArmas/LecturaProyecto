import moment from 'moment';
import path from 'path';

const extensionName = ".mp3";
const passwordLength = 6;

//Strings
export const HOME_NAME= "INICIO";
export const MY_COURSES_NAME= "MIS CURSOS";
export const CERTIFICATES_NAME= "CERTIFICADOS";
export const SUBSECTION_HOME_1_NAME= "NUEVOS CURSOS";
export const SUBSECTION_HOME_2_NAME= "MEJORES CURSOS";
export const SUBSECTION_HOME_3_NAME= "RECOMENDADOS";
export const SUBSECTION_MY_COURSES_1_NAME= "COMPLETADOS";
export const SUBSECTION_MY_COURSES_2_NAME= "NO COMPLETADOS";

export const MAIL = "CORREO";
export const PASSWORD = "CONTRASEÑA";
export const LOGIN = "INGRESAR";
export const REGISTER = "REGISTRARSE";
export const FORGOT_PASSWORD = "¿OLVIDÓ SU CONTRASEÑA?";

export const EMAIL_INPUT_HELP = "Ingrese su correo electrónico";
export const PASSWORD_INPUT_HELP = "Baje el volumen del dispositivo e ingrese la contraseña";
export const PASSWORD_CONFIRM_INPUT_HELP = "Baje el volumen del dispositivo e ingrese la contraseña";

export const LOGIN_ERROR = "Error al iniciar sesión";
export const UNFILL_MAIL_ERROR = "Debe ingresar un correo electrónico";
export const UNFILL_PASSWORD_ERROR = "Debe ingresar una contraseña";
export const UNFILL_PASSWORD_CONFIRM_ERROR = "Debe confirmar la contraseña";
export const REGISTER_ERROR = "Error al registrar";
export const FORGOT_PASSWORD_ERROR = "Error al recuperar contraseña";
export const PASSWORD_DONT_MATCH = "Las contraseñas no coinciden";
export const PASSWORD_LENGTH_ERROR = `La contraseña debe tener al menos ${passwordLength} caracteres`;
export const SIGN_OUT_ERROR = "Error al cerrar sesión";
export const GETTING_DATA_ERROR = "Error al obtener datos";

export const MORE_NAME = "Ver más...";
export const BACK_NAME = "Volver";
//Keys
export const ENTER_KEY = 13;
export const TAB_KEY = 9;
//Voices
export const VOICE_ES = window.speechSynthesis.getVoices()[6] as SpeechSynthesisVoice;
export const VOICE_EN = window.speechSynthesis.getVoices()[0] as SpeechSynthesisVoice;
//Paths
export const PATH_LOGIN = "/login";
export const PATH_REGISTER = "/register";
export const PATH_FORGOT_PASSWORD = "/forgot-password";
export const PATH_EARLEANING = "/earleaning";
export const PATH_HOME = "home";
export const PATH_MY_COURSES = "mycourses";
export const PATH_COURSE = "course";
export const PATH_CERTIFICATES = "certificates";
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

export const formatTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours < 10 ? "0" + hours : hours}h${minutes < 10 ? "0" + minutes : minutes}min`;
}

export const checkPassword = (password: string) => {
    return (password.length >= passwordLength);
}

export const checkExtension = (file: string) => {
    const extension = path.extname(file);
    return (extension as string === extensionName);
}