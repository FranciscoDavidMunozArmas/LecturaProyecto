import moment from 'moment';
import path from 'path';

const extensionName = ".mp3";
const passwordLength = 6;

//Strings
export const HOME_NAME = "INICIO";
export const MY_COURSES_NAME = "MIS CURSOS";
export const CERTIFICATES_NAME = "CERTIFICADOS";
export const SUBSECTION_COURSES = "CURSOS";
export const SUBSECTION_HOME_1_NAME = "NUEVOS CURSOS";
export const SUBSECTION_HOME_2_NAME = "MEJORES CURSOS";
export const SUBSECTION_HOME_3_NAME = "RECOMENDADOS";
export const SUBSECTION_MY_COURSES_1_NAME = "COMPLETADOS";
export const SUBSECTION_MY_COURSES_2_NAME = "NO COMPLETADOS";

export const MAIL = "CORREO";
export const PASSWORD = "CONTRASEÑA";
export const LOGIN = "INGRESAR";
export const REGISTER = "REGISTRARSE";
export const FORGOT_PASSWORD = "¿OLVIDÓ SU CONTRASEÑA?";

export const HINT_COURSE_NAME = "Nombre del curso";
export const HINT_COURSE_DESCRIPTION = "Descripción del curso";
export const HINT_COURSE_REQUIREMENT = "Requisito del curso";

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
export const SEND_DATA_ERROR = "Error al enviar datos";
export const SAVING_DATA_ERROR = "Error al guardar datos";
export const AUDIO_ERROR = "Error al cargar el audio";

export const ENTERING_COURSE_ERROR = "Primero debe inscribirse en el curso";

export const EDIT_NAME = "Editar";
export const MORE_NAME = "Ver más...";
export const BACK_NAME = "Volver";
export const SAVE_NAME = "Inscribirse";
export const SAVED_NAME = "Inscrito";
export const PREVIOURS_NAME = "Anterior";
export const NEXT_NAME = "Siguiente";
export const PLAY_NAME = "Reproducir";
export const PAUSE_NAME = "Pausar";
export const REQUIERMENTS_NAME = "Requerisitos previos";
export const CERTIFICATE_NAME = "Certificado";
export const GENERATE_CERTIFICATE_NAME = "Generar certificado";
export const GENERATE_CERTIFICATE_SUCCESS = "Certificado generado con exito";
export const CERTIFICATE_DOWNLOAD_ERROR = "Error al descargar certificado";
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
export const PATH_TEACHER = "/teacher";
export const PATH_HOME = "home";
export const PATH_MY_COURSES = "mycourses";
export const PATH_COURSE = "course";
export const PATH_CERTIFICATES = "certificates";
export const PATH_PLAYCOURSE = "playcourse";
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
export const AUDIO_URI = `${CONSTANTS.API_URI}/${CONSTANTS.API_PREFIX}/${CONSTANTS.API_VERSION}/uploads/audios/`;

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
    const hours = Math.trunc(Math.floor(time / 60));
    const minutes = Math.trunc(time % 60);
    return `${hours < 10 ? "0" + hours : hours}h${minutes < 10 ? "0" + minutes : minutes}min`;
}

export const formatMinutes = (time: number) => {
    const seconds = Math.trunc(time % 60);
    const minutes = Math.trunc(time / 60);

    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

export const checkPassword = (password: string) => {
    return (password.length >= passwordLength);
}

export const checkExtension = (file: string) => {
    const extension = path.extname(file);
    return (extension as string === extensionName);
}