import axios from "axios"
import { getAuthorizationToken } from "../libs/tokenInterceptor";
import { URI } from "../libs/utils"
import { Course, courseConverter } from "../models/Course";
import { CourseClass, courseClassConverter } from "../models/CourseClass";
import { Score, scoreConverter } from "../models/Score";
import { Topic, topicConverter } from "../models/Topic";

export const getCourses = async () => {
    return await axios.get(`${URI}/courses`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const createCourse = async (course: any) => {
    return await axios.post(`${URI}/courses`, courseConverter.toJSON(course),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteCourses = async () => {
    return await axios.delete(`${URI}/courses`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const getCourse = async (id: any) => {
    return await axios.get(`${URI}/courses/course/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const updateCourse = async (course: any) => {
    return await axios.put(`${URI}/courses/course/${course.id}`, courseConverter.toJSON(course),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteCourse = async (id: any) => {
    return await axios.delete(`${URI}/courses/course/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const completeCourse = async (id: any, completed: number) => {
    return await axios.post(`${URI}/courses/course/${id}/complete`, { completeLevel: completed },
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const setScore = async (course: Course, score: Score) => {
    return await axios.post(`${URI}/courses/course/${course.id}/score`, scoreConverter.toJSON(score),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteScore = async (course: Course) => {
    return await axios.delete(`${URI}/courses/course/${course.id}/score`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const createTopic = async (course: Course, topic: Topic) => {
    return await axios.post(`${URI}/courses/course/${course.id}/topics`, topicConverter.toJSON(topic),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const updateTopic = async (course: Course, topic: Topic) => {
    return await axios.put(`${URI}/courses/course/${course.id}/topics/topic/${topic.id}`, topicConverter.toJSON(topic),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteTopic = async (course: Course, topic: Topic) => {
    return await axios.delete(`${URI}/courses/course/${course.id}/topics/topic/${topic.id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const addCourseClass = async (course: Course, topic: Topic, courseClass: CourseClass, audio: File) => {
    const form = new FormData();
    form.append("audio", audio);
    form.append("name", courseClass.name);
    return await axios.post(`${URI}/courses/course/${course.id}/topics/topic/${topic.id}/class`, form,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteCourseClasses = async (course: Course, topic: Topic) => {
    return await axios.delete(`${URI}/courses/course/${course.id}/topics/topic/${topic.id}/class`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const updateCourseClass = async (course: Course, topic: Topic, courseClass: CourseClass, audio: File) => {
    const form = new FormData();
    form.append("audio", audio);
    form.append("name", courseClass.name);
    return await axios.put(`${URI}/courses/course/${course.id}/topics/topic/${topic.id}/class/${courseClass.id}`, form,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteCourseClass = async (course: Course, topic: Topic, courseClass: CourseClass) => {
    return await axios.delete(`${URI}/courses/course/${course.id}/topics/topic/${topic.id}/class/${courseClass.id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const getCoursesMany = async (ids: string[]) => {
    return await axios.post(`${URI}/courses/many`, { ids: ids},
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}