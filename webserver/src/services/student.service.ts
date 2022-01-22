import axios from "axios"
import { getAuthorizationToken } from "../libs/tokenInterceptor";
import { URI } from "../libs/utils"
import { Student, studentConverter } from "../models/Student";

export const getStudents = async () => {
    return await axios.get(`${URI}/students`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const createStudent = async (uid: string, student: Student) => {
    const data = studentConverter.toJSON(student);
    return await axios.post(`${URI}/students`, {login: uid, ...data},
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteStudents = async () => {
    return await axios.delete(`${URI}/students`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const getStudent = async (id: any) => {
    return await axios.get(`${URI}/students/student/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const updateStudent = async (id: string, student: Student) => {
    return await axios.put(`${URI}/students/student/${id}`, studentConverter.toJSON(student),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteStudent = async (id: any) => {
    return await axios.delete(`${URI}/students/student/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}
