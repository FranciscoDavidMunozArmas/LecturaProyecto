import { Request, Response } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../config/firebase.config";
import { contentConverter } from "../models/Content";
import { courseConverter } from "../models/Course";
import { courseClassConverter } from "../models/CourseClass";
import { topicConverter } from "../models/Topic";

const collectionReference = collection(db, "courses");

const documentReference = (id: string) => doc(collectionReference, id);

export const getCourses = async (req: Request, res: Response) => {
    try {
        const docData = await getDocs(collectionReference);
        if (docData.empty) {
            return res.status(200).json({
                message: "No courses found"
            });
        }
        const courses = docData.docs.map(doc => courseConverter.fromJSON(doc.data()));
        return res.status(200).json(courses.map(courseConverter.toJSON));
    } catch (error: any) {
                return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const createCourse = async (req: Request, res: Response) => {
    try {
        const data = courseConverter.fromJSON(req.body);
        if (data) {
            const docData = await addDoc(collectionReference, courseConverter.toJSON(data));
            return res.status(201).json({ message: 'Course Created' });
        }
        return res.status(401).json({ message: 'Invalid Course' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const deleteCourses = async (req: Request, res: Response) => {
    try {
        const data = await getDocs(collectionReference);
        let documents: number = 0;
        data.forEach(async doc => {
            documents++;
            await deleteDoc(doc.ref);
        });
        return res.status(200).json({ documents });
    } catch (error: any) {
                return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const getCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docData = await getDoc(documentReference(id));
        if (docData.data()) {
            const course = courseConverter.fromJSON(docData.data());
            return res.status(200).json(courseConverter.toJSON(course));
        }
        return res.status(404).json({ message: 'Course not found' });
    } catch (error: any) {
                return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = courseConverter.fromJSON(req.body);
        if (data) {
            await updateDoc(documentReference(id), courseConverter.toJSON(data));
            return res.status(200).json({ message: 'Course Updated' });
        }
        return res.status(401).json({ message: 'Invalid Course' });
    } catch (error: any) {
                return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteDoc(documentReference(id));
        return res.status(200).json({ message: 'Course Deleted' });
    } catch (error: any) {
                return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const createTopic = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        req.body.id = v4();
        const data = topicConverter.fromJSON(req.body);
        if (data) {
            const docData = await getDoc(documentReference(courseId));
            if (docData.data()) {
                const course = courseConverter.fromJSON(docData.data());
                course.content.topics.push(data);
                await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
                return res.status(201).json({ message: 'Topic Created' });
            }
        }
        return res.status(401).json({ message: 'Invalid Topic' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const updateTopic = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId } = req.params;
        req.body.id = topicId;
        const data = topicConverter.fromJSON(req.body);
        if (data) {
            const docData = await getDoc(documentReference(courseId));
            if (docData.data()) {
                const course = courseConverter.fromJSON(docData.data());
                course.content.topics.map(topic => {
                    if (topic.id === topicId) {
                        topic.name = data.name;
                    }
                    return topic;
                });
                await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
                return res.status(201).json({ message: 'Topic Updated' });
            }
        }
        return res.status(401).json({ message: 'Invalid Topic' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const addCourseClasses = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId } = req.params;
        req.body.file = req.file?.filename;
        const data = courseClassConverter.fromJSON(req.body);
        if (data) {
            const docData = await getDoc(documentReference(courseId));
            if (docData.data()) {
                const course = courseConverter.fromJSON(docData.data());
                course.content.topics.map(topic => {
                    if (topic.id === topicId) {
                        console.log(topic.classes);
                        topic.classes.push(data);
                    }
                    return topic;
                });
                await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
                return res.status(201).json({ message: 'Class Added' });
            }
        }
        return res.status(401).json({ message: 'Invalid Class' });
    } catch (error: any) {
                return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}