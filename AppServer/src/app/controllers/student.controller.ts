import { Request, Response } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { studentConverter } from "../models/Student";
import { User, userConverter } from "../models/User";
import { createUser, deleteUser, deleteUsers, getUser, getUsers } from "./user.controller";

const collectionReference = collection(db, "students");

const documentReference = (id: string) => doc(collectionReference, id);

export const getStudents = async (req: Request, res: Response) => {
    try {
        const docData = await getDocs(collectionReference);
        if (docData.empty) {
            return res.status(200).json({
                message: "No students found"
            });
        }
        const students = docData.docs.map(doc => studentConverter.fromJSON(doc.data()));
        return res.status(200).json(students.map(studentConverter.toJSON));
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { login } = req.body;
        const data = studentConverter.fromJSON(req.body);
        const docData = await addDoc(collectionReference, studentConverter.toJSON(data));
        if (docData) {
            const flag = await createUser(new User(login, docData.id, "student"));
            if (flag) {
                return res.status(200).json({
                    message: "Student created"
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

export const deleteStudents = async (req: Request, res: Response) => {
    try {
        const data = await getDocs(collectionReference);
        let documents: number = 0;
        data.forEach(doc => {
            documents++;
            deleteDoc(doc.ref);
        });
        return res.status(200).json(documents);
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const getStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getUser(id);
        if (docData) {
            const studentDoc = await getDoc(documentReference(docData.user));
            if (studentDoc.data()) {
                const student = studentConverter.fromJSON(studentDoc.data())
                return res.status(200).json(studentConverter.toJSON(student));
            }
        }
        return res.status(404).json({
            message: "Student not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getUser(id);
        if (docData) {
            const studentDoc = await getDoc(documentReference(docData.user));
            if (studentDoc.data()) {
                const student = studentConverter.fromJSON(req.body);
                await setDoc(documentReference(docData.user), studentConverter.toJSON(student));
                return res.status(200).json({ message: "Student updated" });
            }
        }
        return res.status(404).json({
            message: "Student not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getUser(id);
        if (docData) {
            const studentDoc = await getDoc(documentReference(docData.user));
            if (studentDoc.data()) {
                await deleteUser(id);
                await deleteDoc(documentReference(docData.user));
                return res.status(200).json({ message: "Student deleted" });
            }
        }
        return res.status(404).json({
            message: "Student not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}