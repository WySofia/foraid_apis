import { CustomError } from './errorTypes';
import { Response } from 'express';

export const handleControllerError = (res: Response, error: CustomError) => {
    switch (error.tag) {
        case 'ValidationError':
            res.status(400).json({ error: error.message, field: error.field });
            break;
        case 'LogicError':
            res.status(404).json({ error: error.message });
            break;
        case 'DataError':
            res.status(500).json({ error: error.message });
            break;
        case 'ApiError':
            res.status(502).json({
                error: error.message,
                statusCode: error.statusCode,
            });
            break;
        default:
            res.status(500).json({ error: 'Error desconocido.' });
    }
};
