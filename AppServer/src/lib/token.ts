import jwt from 'jsonwebtoken';
import { CONSTANTS } from './utils';

export const tokenize = (token: any) => {
    return jwt.sign(token, CONSTANTS.TOKEN_KEY);
}

export const decodeToken = (token: any) => {
    return jwt.decode(token);
}