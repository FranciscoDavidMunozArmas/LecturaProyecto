import { CONSTANTS } from "./utils";
import Cookies from "cookies-ts";
import jwt from 'jsonwebtoken';

export const setUpToken = (token: any, storage?: boolean) => {
    removeToken();
    if (!storage) {
        const cookies = new Cookies();
        const exipireDate = new Date();
        exipireDate.setHours(exipireDate.getHours() + 2);
        cookies.set(CONSTANTS.TOKEN_NAME as string, token, {
            expires: exipireDate
        });
    } else {
        localStorage.setItem(CONSTANTS.TOKEN_NAME as string, token);
    }
}

export const removeToken = () => {
    const cookies = new Cookies();
    cookies.remove(CONSTANTS.TOKEN_NAME as string);
    localStorage.removeItem(CONSTANTS.TOKEN_NAME as string);
}

export const getToken = () => {
    const cookies = new Cookies();
    const cookieResult = cookies.get(CONSTANTS.TOKEN_NAME as string);
    if (cookieResult) {
        return cookieResult;
    } else {
        const localResult = localStorage.getItem(CONSTANTS.TOKEN_NAME as string);
        return localResult;
    }
}

export const checkToken = () => {
    const cookies = new Cookies();
    return !!localStorage.getItem(CONSTANTS.TOKEN_NAME as string) || !!cookies.get(CONSTANTS.TOKEN_NAME as string);
}

export const decodeToken = (token: any) => {
    return jwt.verify(token, CONSTANTS.SECRET_KEY as string);
}

export const getAuthorizationToken = () => {
    return `Bearer ${getToken()}`;
}