import dotenv from 'dotenv';

dotenv.config();

export const CONSTANTS = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    PORT: process.env.PORT || 3000,
    TOKEN_KEY: process.env.TOKEN_KEY || "",
    ROLES: ["student", "teacher"],
    API_VERSION: 'v1',
    AUDIO_FOLDER_ROUTE: 'uploads/audios/',
}