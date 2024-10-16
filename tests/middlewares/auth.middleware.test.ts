import { describe, it, expect, vi } from 'vitest';
import { auth } from '../../src/middlewares/auth.middleware';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

vi.mock('jsonwebtoken');

describe('auth middleware', () => {
    const TOKEN_SECRET = 'testsecret';

    const mockRequest = (cookies: unknown): Request => {
        return {
            cookies,
        } as Request;
    };

    const mockResponse = () => {
        const res = {} as Response;
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        return res;
    };

    const mockNext = vi.fn() as NextFunction;

    it('should return 401 if no token is provided', () => {
        const req = mockRequest({});
        const res = mockResponse();

        auth(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No token, No autorizado',
        });
    });

    it('should return 401 if token is invalid', () => {
        const req = mockRequest({ token: 'invalidtoken' });
        const res = mockResponse();

        (jwt.verify as unknown).mockImplementation(
            (token: string, secret: string, callback: unknown) => {
                callback(new Error('Token is not valid'), null);
            }
        );

        auth(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Token is not valid',
        });
    });

    it('should call next if token is valid', () => {
        const req = mockRequest({ token: 'validtoken' });
        const res = mockResponse();

        const mockUser = { id: 1, name: 'Test User' };
        (jwt.verify as unknown).mockImplementation(
            (token: string, secret: string, callback: unknown) => {
                callback(null, mockUser);
            }
        );

        auth(req, res, mockNext);

        expect(req.usuario).toEqual(mockUser);
        expect(mockNext).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', () => {
        const req = mockRequest({ token: 'validtoken' });
        const res = mockResponse();

        (jwt.verify as unknown).mockImplementation(() => {
            throw new Error('Unexpected error');
        });

        auth(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: new Error('Unexpected error'),
        });
    });
});
