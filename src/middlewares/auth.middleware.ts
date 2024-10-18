import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../libs/jwt';
import { NextFunction, Request, Response } from 'express';

declare module 'express' {
    export interface Request {
        usuario?: unknown;
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token'] as string;

        if (!token) {
            res.status(401).json({ message: 'No token, No autorizado' });
            return;
        }

        jwt.verify(token, TOKEN_SECRET, (error: unknown, usuario: unknown) => {
            if (error) {
                return res.status(401).json({ message: 'Token is not valid' });
            }
            req.usuario = usuario;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
