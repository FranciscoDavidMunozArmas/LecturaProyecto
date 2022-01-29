import axios from "axios"
import { getAuthorizationToken } from "../libs/tokenInterceptor";
import { URI } from "../libs/utils"

export const getCertificates = async () => {
    return await axios.get(`${URI}/certificates`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const createCertificate = async (courseID: any) => {
    return await axios.post(`${URI}/certificates`, { course: courseID },
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteCertificates = async () => {
    return await axios.delete(`${URI}/certificates`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const getCertificate = async (id: any) => {
    return await axios.get(`${URI}/certificates/certificate/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}

export const deleteCertificate = async (id: any) => {
    return await axios.delete(`${URI}/certificates/certificate/${id}`,
        {
            headers: {
                Authorization: getAuthorizationToken()
            }
        });
}   