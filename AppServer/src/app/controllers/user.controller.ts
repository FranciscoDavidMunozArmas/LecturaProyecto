import { Request, Response } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { tokenize } from "../../lib/token";
import { User, userConverter } from "../models/User";

const collectionReference = collection(db, "users");

const documentReference = (id: string) => doc(collectionReference, id);

export const authorization = async (req: Request, res: Response) => {
    try {
        const { login } = req.body;
        const docQuery = query(collectionReference, where("login", "==", login));
        const querySnapshot = await getDocs(docQuery);
        if (querySnapshot.docs[0]) {
            const user = userConverter.fromJSON(querySnapshot.docs[0].data());
            return res.status(200).json(tokenize({ token: user.login, role: user.role, data: user.user }));
        }
        return res.status(401).json({ message: "Unauthorized" });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getUsers = async () => {
    try {
        const docData = await getDocs(collectionReference);
        if (docData.empty) {
            return [];
        }
        return docData.docs.map(userConverter.fromJSON);
    } catch (error: any) {
        throw error;
    }
}

export const getUser = async (login: string) => {
    try {
        const docQuery = query(collectionReference, where("login", "==", login));
        const docData = await getDocs(docQuery);
        if (!docData.docs[0].data()) {
            return null;
        }
        return userConverter.fromJSON(docData.docs[0].data());
    }
    catch (error: any) {
        throw error;
    }
}

export const createUser = async (user: User) => {
    try {
        const data = await addDoc(collectionReference, userConverter.toJSON(user));
        return data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteUsers = async () => {
    try {
        const userDocuments = await getDocs(collectionReference);
        let documents: number = 0;
        userDocuments.forEach(async (doc) => {
            documents++;
            await deleteDoc(doc.ref);
        });
        return documents;
    } catch (error: any) {
        throw error;
    }
}

export const deleteUser = async (id: string) => {
    try {
        const docQuery = query(collectionReference, where("login", "==", id));
        const data = await getDocs(docQuery);
        if (data.docs[0].data()) {
            await deleteDoc(data.docs[0].ref);
        }
    } catch (error: any) {
        throw error;
    }
}