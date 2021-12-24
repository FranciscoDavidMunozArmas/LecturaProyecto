import { Request, Response } from 'express';

export const getAll = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const post = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Post"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteAll = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Delete All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get by ID"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const put = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Put"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Delete by ID"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}