import { Request, Response } from "express";
import { collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { courseConverter } from "../models/Course";
import { scoreConverter } from "../models/Score";

const collectionReference = collection(db, "courses");

const documentReference = (id: string) => doc(collectionReference, id);

export const setScore = async (req: Request| any, res: Response) => {
    try {
        const { courseId } = req.params;
        const data = scoreConverter.fromJSON(req.body);
        data.userID = req.payload.token;
        const docData = await getDoc(documentReference(courseId));
        if (docData.data()) {
            const course = courseConverter.fromJSON(docData.data());
            const existance = course.score.find(score => score.userID === req.payload.token);
            if(existance) {
                existance.score = data.score;
            } else {
                course.score.push(data);
            }
            await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
            return res.status(200).json({
                message: "Score updated"
            });
        }
        return res.status(404).json({
            message: "Course not found"
        });
    } catch (error: any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const deleteScore = async (req: Request | any, res: Response) => {
    try {
        const { courseId } = req.params;
        const docData = await getDoc(documentReference(courseId));
        if (docData.data()) {
            const course = courseConverter.fromJSON(docData.data());
            course.score = course.score.filter(score => score.userID !== req.payload.token);
            await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
            return res.status(200).json({
                message: "Score deleted"
            });
        }
        return res.status(404).json({
            message: "Course not found"
        });
    } catch (error: any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
}