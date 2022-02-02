import { Request, Response } from "express";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../config/firebase.config";
import { unlinkFile } from "../../lib/files";
import { CONSTANTS } from "../../lib/utils";
import { Course, courseConverter } from "../models/Course";
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
            data.id = docData.id;
            await updateDoc(documentReference(data.id), courseConverter.toJSON(data));
            return res.status(201).json({ message: 'Course Created', id: docData.id });
        }
        return res.status(401).json({ message: 'Invalid Course' });
    } catch (error: any) {
        console.log(error.message);
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
            const course = courseConverter.fromJSON(doc.data());
            course.content.topics.forEach(async topic => {
                topic.classes.forEach(async courseClass => {
                    await unlinkFile(courseClass.file);
                });
            });
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
        const data = await getDoc(documentReference(id));
        if (data.data()) {
            const course = courseConverter.fromJSON(data.data());
            course.content.topics.forEach(async topic => {
                topic.classes.forEach(async courseClass => {
                    await unlinkFile(courseClass.file);
                });
            });
        }
        await deleteDoc(data.ref);
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

export const deleteTopic = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId } = req.params;
        const docData = await getDoc(documentReference(courseId));
        if (docData.data()) {
            const course = courseConverter.fromJSON(docData.data());
            course.content.topics = course.content.topics.filter(topic => {
                if (topic.id !== topicId) {
                    return topic;
                }
                topic.classes.forEach(async courseClass => {
                    await unlinkFile(courseClass.file);
                });
            });
            await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
            return res.status(200).json({ message: 'Topic Deleted' });
        }
        return res.status(404).json({ message: 'Course not found' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const addCourseClass = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId } = req.params;
        req.body.id = v4();
        req.body.file = req.file?.filename;
        const data = courseClassConverter.fromJSON(req.body);
        if (data) {
            const docData = await getDoc(documentReference(courseId));
            if (docData.data()) {
                const course = courseConverter.fromJSON(docData.data());
                course.content.topics.map(topic => {
                    if (topic.id === topicId) {
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

export const deleteCourseClasses = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId } = req.params;
        const data = await getDoc(documentReference(courseId));
        if (data.data()) {
            const course = courseConverter.fromJSON(data.data());
            course.content.topics.map(topic => {
                if (topic.id === topicId) {
                    topic.classes.forEach(async courseClass => {
                        await unlinkFile(courseClass.file);
                    });
                    topic.classes = [];
                }
                return topic;
            });
            await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
            return res.status(200).json({ message: 'Classes Deleted' });
        }
        return res.status(404).json({ message: 'Course not found' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const updateCourseClass = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId, classId } = req.params;
        const data = courseClassConverter.fromJSON(req.body);
        const filename = req.file?.filename;
        if (data.name) {
            const docData = await getDoc(documentReference(courseId));
            if (docData.data()) {
                const course = courseConverter.fromJSON(docData.data());
                course.content.topics = course.content.topics.map(topic => {
                    if (topic.id === topicId) {
                        topic.classes.map(async courseClass => {
                            if (courseClass.id === classId) {
                                courseClass.name = data.name;
                                if (filename) {
                                    console.log(courseClass.file);
                                    await unlinkFile(`${CONSTANTS.AUDIO_FOLDER_ROUTE}${courseClass.file}`);
                                    courseClass.file = filename;
                                }
                            }
                            return courseClass;
                        });
                    }
                    return topic;
                });
                await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
                return res.status(201).json({ message: 'Class Updated' });
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

export const deleteCourseClass = async (req: Request, res: Response) => {
    try {
        const { courseId, topicId, classId } = req.params;
        const data = await getDoc(documentReference(courseId));
        if (data.data()) {
            const course = courseConverter.fromJSON(data.data());
            course.content.topics.map(topic => {
                if (topic.id === topicId) {
                    topic.classes = topic.classes.filter(async courseClass => {
                        if (courseClass.id !== classId) {
                            return courseClass;
                        }
                        await unlinkFile(courseClass.file);
                    });
                }
                return topic;
            });
            await updateDoc(documentReference(courseId), courseConverter.toJSON(course));
            return res.status(200).json({ message: 'Class Deleted' });
        }
        return res.status(404).json({ message: 'Course not found' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}

export const getCoursesMany = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        const dataQuery = query(collectionReference, where('id', 'in', ids));
        const dataDocs = await getDocs(dataQuery);
        const data: Course[] = dataDocs.docs.map(doc => courseConverter.fromJSON(doc.data()));
        if (data.length >= 0) {
            return res.status(200).json(data);
        }
        return res.status(404).json({ message: 'Courses not found' });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    };
}