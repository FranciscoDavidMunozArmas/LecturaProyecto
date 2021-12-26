import { decode } from "jsonwebtoken";
import { decodeToken } from "../../lib/token";
import { getUser } from "../controllers/user.controller";

const verifyToken = (auth: any) => {
    if (!auth) {
        return false;
    }
    const bearer = auth.split(' ');
    if (!bearer || bearer.length < 2) {
        return false;
    }
    const payload = decodeToken(bearer[1]);
    if (!payload) {
        return false;
    }
    return payload;
}

const verifyExistance = async (payload: any) => {
    try {
        const data = await getUser(payload.token);
        if(data) {
            return true;
        }
        return null;
    } catch (error: any) {
        return null;
    }
}

export const authUser = (req: any, res: any, next: any) => {
    const payload = verifyToken(req.headers.authorization);
    if (!payload) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    verifyExistance(payload)
    .then((result: any) => {
        if (!result) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.payload = payload;
        next();
    })
    .catch(() => { return res.status(401).json({ message: 'Unauthorized' }) });
}

export const authStudent = (req: any, res: any, next: any) => {
    const { payload } = req;
    if(payload.role === "student") {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}