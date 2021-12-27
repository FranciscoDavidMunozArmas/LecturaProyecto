import { Request, Response } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../config/firebase.config";
import { unlinkFile } from "../../lib/files";
import { certificateConverter } from "../models/Certificate";

const collectionReference = collection(db, "certificates");

const documentReference = (id: string) => doc(collectionReference, id);

export const getCertificates = async (req: Request | any, res: Response) => {
    try {
        const { data } = req.payload;
        const queryDoc = query(collectionReference, where("student", "==" , data));
        const querySnapshot = await getDocs(queryDoc);
        if (querySnapshot.empty) {
            return res.status(200).json({ message: "No certificates found" });
        }
        const certificates = querySnapshot.docs.map(certificateConverter.fromJSON);
        return res.status(200).json(certificates.map(certificateConverter.toJSON));
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
        const certificateData = certificateConverter.fromJSON(req.body);
        certificateData.id = v4();
        certificateData.student = data;
        const docData = await addDoc(collectionReference, data);
        return res.status(200).json({ message: "Certificate created successfully" });
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
        const queryDoc = query(collectionReference, where("student", "==" , data));
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
        const queryDoc = documentReference(id);
        const data = await getDoc(queryDoc);
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
        const queryDoc = documentReference(id);
        await deleteDoc(queryDoc);
        return res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

