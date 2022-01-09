import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { CONSTANTS } from "../libs/utils";

const firebaseConfig = {
    apiKey: CONSTANTS.FIREBASE_API_KEY,
    authDomain: CONSTANTS.FIREBASE_AUTH_DOMAIN,
    projectId: CONSTANTS.FIREBASE_PROJECT_ID,
    storageBucket: CONSTANTS.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: CONSTANTS.FIREBASE_MESSAGING_SENDER_ID,
    appId: CONSTANTS.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);