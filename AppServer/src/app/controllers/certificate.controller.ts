import { Request, Response } from "express";
import { addDoc, collection, CollectionReference, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../config/firebase.config";
import { certificateConverter } from "../models/Certificate";

const certificatesReference = collection(db, "certificates");
const coursesReference = collection(db, "courses");
const studentReference = collection(db, "students");

const documentReference = (id: string, collection: CollectionReference) => doc(collection, id);

export const getCertificates = async (req: Request | any, res: Response) => {
    try {
        const { data } = req.payload;
        const queryDoc = query(certificatesReference, where("owner", "==" , data));
        const querySnapshot = await getDocs(queryDoc);
        if (querySnapshot.empty) {
            return res.status(200).json({ message: "No certificates found" });
        }
        return res.status(200).json(querySnapshot.docs.map(doc => {
            const certificate = certificateConverter.fromJSON(doc.data());
            return certificateConverter.toJSON(certificate);
        }));
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const createCertificate = async (req: Request | any, res: Response) => {
    try {
        const { data } = req.payload;
        const { course } = req.body;
        const courseData = await getDoc(documentReference(course, coursesReference));
        const studentData = await getDoc(documentReference(data, studentReference));

        if(courseData.data() && studentData.data()) {
            const certificate = certificateConverter.fromJSON({ id: v4(), course: courseData.data(), student: studentData.data(), date: new Date(), owner: data });
            const certificateDoc = await addDoc(certificatesReference, certificateConverter.toJSON(certificate));
            return res.status(201).json({ message: "Certificate created successfully" });
        }
        return res.status(400).json({ message: "Course or student not found" });
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const deleteCertificates = async (req: Request | any, res: Response) => {
    try {
        const { data } = req.payload;
        const queryDoc = query(certificatesReference, where("owner", "==" , data));
        const querySnapshot = await getDocs(queryDoc);
        if (querySnapshot.empty) {
            return res.status(200).json({ message: "No certificates found" });
        }
        querySnapshot.docs.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        return res.status(200).json({ message: "Certificates deleted successfully" });
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getCertificate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const queryDoc = query(certificatesReference, where("id", "==" , id));
        const querySnapshot = await getDocs(queryDoc);
        const data = querySnapshot.docs[0];
        if (data.data()) {
            const certificate = certificateConverter.fromJSON(data.data());
            return res.status(200).json(certificateConverter.toJSON(certificate));
        }
        return res.status(200).json({ message: "No certificate found" });
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const deleteCertificate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const queryDoc = query(certificatesReference, where("id", "==" , id));
        const querySnapshot = await getDocs(queryDoc);
        await deleteDoc(querySnapshot.docs[0].ref);
        return res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

