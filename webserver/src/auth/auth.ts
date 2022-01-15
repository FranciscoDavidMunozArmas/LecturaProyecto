import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase.config';

export const createUser = async (username: string, password: string) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        console.log(userCredential.user);
        return true;
    } catch (error: any) {
        console.log({
            errorCode: error.code,
            errorMessage: error.message
        });
        return false;
    }
}

export const authUser = async (username: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        console.log(userCredential.user);
        return true;
    } catch (error: any) {
        console.log({
            errorCode: error.code,
            errorMessage: error.message
        });
        return false;
    }
}