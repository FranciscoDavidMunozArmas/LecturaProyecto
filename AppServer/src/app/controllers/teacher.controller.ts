import { Request, Response } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { CONSTANTS } from "../../lib/utils";
import { teacherConverter } from "../models/Teacher";
import { User } from "../models/User";
import { createUser, deleteUser, getUser } from "./user.controller";

const collectionReference = collection(db, "teachers");

const documentReference = (id: string) => doc(collectionReference, id);

export const getTeachers = async (req: Request, res: Response) => {
    try {
        const docData = await getDocs(collectionReference);
        if (docData.empty) {
            return res.status(200).json({
                message: "No teachers found"
            });
        }
        const teachers = docData.docs.map(doc => teacherConverter.fromJSON(doc.data()));
        return res.status(200).json(teachers.map(teacherConverter.toJSON));
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const { login } = req.body;
        const data = teacherConverter.fromJSON(req.body);
        const docData = await addDoc(collectionReference, teacherConverter.toJSON(data));
        if (docData) {
            const flag = await createUser(new User(login, docData.id, CONSTANTS.ROLES[1]));
            if (flag) {
                return res.status(200).json({
                    message: "Teacher created"
                });
            }
        }
        return res.status(500).json({ message: "Internal server error" });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const deleteTeachers = async (req: Request, res: Response) => {
    try {
        const data = await getDocs(collectionReference);
        let documents: number = 0;
        data.forEach(doc => {
            documents++;
            deleteDoc(doc.ref);
        });
        return res.status(200).json({documents});
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const getTeacher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getUser(id);
        if (docData) {
            const teacherDoc = await getDoc(documentReference(docData.user));
            if(teacherDoc) {
                const teacher = teacherConverter.fromJSON(teacherDoc.data());
                return res.status(200).json(teacherConverter.toJSON(teacher));
            }
        }
        return res.status(404).json({ message: "Teacher not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getUser(id);
        if(docData) {
            const teacherDoc = await getDoc(documentReference(docData.user));
            if(teacherDoc.data()) {
                const updatedTeacher = teacherConverter.fromJSON(req.body);
                await setDoc(documentReference(docData.user), teacherConverter.toJSON(updatedTeacher));
                return res.status(200).json({ message: "Teacher updated" });
            }
        }
        return res.status(404).json({ message: "Teacher not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const deleteTeacher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getUser(id);
        if(docData) {
            const teacherDoc = await getDoc(documentReference(docData.user));
            if(teacherDoc.data()) {
                await deleteUser(docData.login);
                await deleteDoc(documentReference(docData.user));
                return res.status(200).json({ message: "Teacher deleted" });
            }
        }
        return res.status(404).json({ message: "Teacher not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}