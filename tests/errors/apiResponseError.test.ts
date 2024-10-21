import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleControllerError } from '../../src/errors/apiResponseError';
import { Response } from 'express';
import { CustomError } from '../../src/errors/errorTypes';

describe('handleControllerError', () => {
    let res: Response;

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;
    });
    ``;
    it('should handle ValidationError', () => {
        const error: CustomError = {
            tag: 'ValidationError',
            message: 'Invalid input',
            field: 'username',
        };
        handleControllerError(res, error);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid input',
            field: 'username',
        });
    });

    it('should handle LogicError', () => {
        const error: CustomError = { tag: 'LogicError', message: 'Not found' };
        handleControllerError(res, error);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });

    it('should handle DataError', () => {
        const error: CustomError = {
            tag: 'DataError',
            message: 'Internal server error',
        };
        handleControllerError(res, error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Internal server error',
        });
    });

    it('should handle ApiError', () => {
        const error: CustomError = {
            tag: 'ApiError',
            message: 'Bad gateway',
            statusCode: 502,
        };
        handleControllerError(res, error);
        expect(res.status).toHaveBeenCalledWith(502);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Bad gateway',
            statusCode: 502,
        });
    });

    it('should handle unknown error', () => {
        const error: CustomError = {
            tag: 'UnknownError',
            message: 'Unknown error',
        };
        handleControllerError(res, error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error desconocido.' });
    });
});
