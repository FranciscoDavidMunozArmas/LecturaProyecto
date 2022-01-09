import axios from "axios"
import { getAuthorizationToken } from "../libs/tokenInterceptor";
import { URI } from "../libs/utils"
import { Teacher, teacherConverter } from "../models/Teacher";

export const getTeachers = async () => {
    return await axios.get(`${URI}/teachers`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const createTeacher = async (teacher: Teacher) => {
    return await axios.post(`${URI}/teachers`, teacherConverter.toJSON(teacher),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteTeachers = async () => {
    return await axios.delete(`${URI}/teachers`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const getTeacher = async (id: any) => {
    return await axios.get(`${URI}/teachers/teacher/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const updateTeacher = async (id: string, teacher: Teacher) => {
    return await axios.put(`${URI}/teachers/teacher/${id}`, teacherConverter.toJSON(teacher),
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteTeacher = async (id: any) => {
    return await axios.delete(`${URI}/teachers/teacher/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}