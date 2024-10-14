// tests/controllers/auth.controller.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    register,
    login,
    verifyToken,
    logout,
} from '../../src/controllers/auth.controller';
import * as prismaModule from '../../src/db';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as resultUtils from '../../src/errors/resultUtils';
import * as jwtLib from '../../src/libs/jwt';

// Mocks
vi.mock('bcrypt', () => ({
    hash: vi.fn(),
    compare: vi.fn(),
}));

vi.mock('jsonwebtoken', () => ({
    sign: vi.fn(),
    verify: vi.fn(),
}));

vi.mock('../../src/db', () => ({
    prisma: {
        usuario: {
            findUnique: vi.fn(),
            create: vi.fn(),
        },
    },
}));

vi.mock('../../src/errors/resultUtils', () => ({
    tryCatch: vi.fn(),
    isErr: (result: any) => result.type === 'err',
}));

vi.mock('../../src/libs/jwt', () => ({
    createAccessToken: vi.fn(),
    TOKEN_SECRET: 'test-secret',
}));

describe('Auth Controller', () => {
    let req: any;
    let res: any;
    let prisma: any;

    beforeEach(() => {
        req = { body: {}, cookies: {} };
        res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
            json: vi.fn(),
            cookie: vi.fn(),
        };
        prisma = prismaModule.prisma;
        vi.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const { tryCatch } = resultUtils;
            const { createAccessToken } = jwtLib;

            // Mocks
            tryCatch
                // prisma.usuario.findUnique
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: null,
                }))
                // bcrypt.hash
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: 'hashedPassword',
                }))
                // prisma.usuario.create
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: {
                        id_usuario: 1,
                        nombre: 'Test',
                        apellido: 'User',
                        correo: 'test@example.com',
                    },
                }));

            createAccessToken.mockResolvedValue('mocked-token');

            req.body = {
                nombre: 'Test',
                apellido: 'User',
                correo: 'test@example.com',
                contrasenia_hash: 'password123',
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.cookie).toHaveBeenCalledWith(
                'token',
                'mocked-token',
                expect.any(Object)
            );
            expect(res.send).toHaveBeenCalledWith({ token: 'mocked-token' });
        });

        it('should return 400 if user already exists', async () => {
            const { tryCatch } = resultUtils;

            // Mocks
            tryCatch
                // prisma.usuario.findUnique
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: { id_usuario: 1 },
                }));

            req.body = {
                nombre: 'Test',
                apellido: 'User',
                correo: 'test@example.com',
                contrasenia_hash: 'password123',
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.any(String),
                    tag: expect.any(String),
                })
            );
        });

        it('should return 500 on database error', async () => {
            const { tryCatch } = resultUtils;

            // Mocks
            tryCatch
                // prisma.usuario.findUnique
                .mockImplementationOnce(async () => ({
                    type: 'err',
                    error: { message: 'DB Error', tag: 'DataError' },
                }));

            req.body = {
                nombre: 'Test',
                apellido: 'User',
                correo: 'test@example.com',
                contrasenia_hash: 'password123',
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.objectContaining({
                        message: expect.any(String),
                    }),
                })
            );
        });
    });

    describe('login', () => {
        it('should log in a user', async () => {
            const { tryCatch } = resultUtils;
            const { createAccessToken } = jwtLib;

            // Mocks
            tryCatch
                // prisma.usuario.findUnique
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: {
                        id_usuario: 1,
                        contrasenia_hash: 'hashedPassword',
                        nombre: 'Test',
                        apellido: 'User',
                        correo: 'test@example.com',
                    },
                }))
                // bcrypt.compare
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: true,
                }));

            createAccessToken.mockResolvedValue('mocked-token');

            req.body = {
                correo: 'test@example.com',
                contrasenia_hash: 'password123',
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.cookie).toHaveBeenCalledWith(
                'token',
                'mocked-token',
                expect.any(Object)
            );
            expect(res.send).toHaveBeenCalledWith({ token: 'mocked-token' });
        });

        it('should return 400 if password does not match', async () => {
            const { tryCatch } = resultUtils;

            // Mocks
            tryCatch
                // prisma.usuario.findUnique
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: {
                        id_usuario: 1,
                        contrasenia_hash: 'hashedPassword',
                    },
                }))
                // bcrypt.compare
                .mockImplementationOnce(async () => ({
                    type: 'ok',
                    value: false,
                }));

            req.body = {
                correo: 'test@example.com',
                contrasenia_hash: 'wrongPassword',
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.any(String),
                    tag: expect.any(String),
                })
            );
        });

        it('should return 500 on database error', async () => {
            const { tryCatch } = resultUtils;

            // Mocks
            tryCatch
                // prisma.usuario.findUnique
                .mockImplementationOnce(async () => ({
                    type: 'err',
                    error: { message: 'DB Error', tag: 'DataError' },
                }));

            req.body = {
                correo: 'test@example.com',
                contrasenia_hash: 'password123',
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.objectContaining({
                        message: expect.any(String),
                    }),
                })
            );
        });
    });

    describe('logout', () => {
        it('should log out a user', async () => {
            await logout(req, res);

            expect(res.cookie).toHaveBeenCalledWith('token', '', {
                httpOnly: true,
                secure: true,
                expires: new Date(0),
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ message: 'Logged out' });
        });
    });
});
