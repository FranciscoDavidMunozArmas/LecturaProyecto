import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase.config';

export const createUser = async (username: string, password: string) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        return userCredential.user.uid;
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
        return userCredential.user.uid;
    } catch (error: any) {
        console.log({
            errorCode: error.code,
            errorMessage: error.message
        });
        return false;
    }
}

export const signOut = async () => {
    try {
        await auth.signOut();
        return true;
    } catch (error: any) {
        console.log({
            errorCode: error.code,
            errorMessage: error.message
        });
        return false;
    }
}