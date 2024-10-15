import { Request, Response } from 'express';
import { prisma } from '../db';
import { UsuarioSchema } from '../models/usuario.schema';
import { createError, handleError } from '../errors/errorUtils';
import { isErr, tryCatch } from '../errors/resultUtils';
import bcrypt from 'bcrypt';
import { createAccessToken, TOKEN_SECRET } from '../libs/jwt';
import jwt from 'jsonwebtoken';
import { loginSchema } from '../schemas/login.schema';

export const register = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const parsedData = UsuarioSchema.safeParse(data);

    if (!parsedData.success) {
        res.status(400).send(handleError('ValidationError', parsedData.error));
        return;
    }

    const userExistsResult = await tryCatch(
        () =>
            prisma.usuario.findUnique({
                where: { correo: parsedData.data.correo },
            }),
        (error) => handleError('DataError', error)
    );

    if (isErr(userExistsResult)) {
        res.status(500).send(userExistsResult);
        return;
    }

    if (userExistsResult.value) {
        res.status(400).send(
            createError('LogicError', `Error con las crendenciales provistas`)
        );
        return;
    }

    const hashedPassword = await tryCatch(
        () => bcrypt.hash(parsedData.data.contrasenia_hash, 10),
        (error) => handleError('DataError', error)
    );

    if (isErr(hashedPassword)) {
        res.status(500).send(
            handleError(
                'DataError',
                'Error de seguridad al guardar la contraseña'
            )
        );
        return;
    }

    const createUserResult = await tryCatch(
        () =>
            prisma.usuario.create({
                data: {
                    ...parsedData.data,
                    contrasenia_hash: hashedPassword.value,
                },
            }),
        (error) => handleError('DataError', error)
    );

    if (isErr(createUserResult)) {
        res.status(500).send(createUserResult);
        return;
    }

    const user = createUserResult.value;
    try {
        const token = await createAccessToken({
            id_usuario: user.id_usuario,
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(201).send({ token });
    } catch (error) {
        res.status(500).send(handleError('UnknownError', error));
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { correo, contrasenia_hash } = req.body;

    const parsedData = loginSchema.safeParse({ correo, contrasenia_hash });

    if (!parsedData.success) {
        res.status(400).send(handleError('ValidationError', parsedData.error));
        return;
    }

    const userResult = await tryCatch(
        () =>
            prisma.usuario.findUnique({
                where: { correo: parsedData.data.correo },
            }),
        (error) => handleError('DataError', error)
    );

    if (isErr(userResult)) {
        res.status(500).send(userResult);
        return;
    }

    const user = userResult.value;

    if (!user) {
        res.status(400).send(
            createError('DataError', 'Correo o contraseña incorrecta')
        );
        return;
    }

    const passwordMatch = await tryCatch(
        () =>
            bcrypt.compare(
                parsedData.data.contrasenia_hash,
                user.contrasenia_hash
            ),
        (error) => handleError('DataError', error)
    );

    if (isErr(passwordMatch) || !passwordMatch.value) {
        res.status(400).send(
            createError('DataError', 'Correo o contraseña incorrecta')
        );
        return;
    }

    try {
        const token = await createAccessToken({
            id_usuario: user.id_usuario,
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(handleError('UnknownError', error));
    }
};

export const verifyToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    const token = req.cookies['token'] as string;

    if (typeof token === 'string' || token === null || token === undefined) {
        res.status(401).json({ message: 'No token, No autorizado' });
        return;
    }

    jwt.verify(token, TOKEN_SECRET, async (error: any, user: any) => {
        if (error) return res.sendStatus(401);

        const userFound = await prisma.usuario.findUnique({
            where: { id_usuario: user.id_usuario },
        });

        if (!userFound) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        }

        return res.json({
            id: userFound.id_usuario,
        });
    });
};

export const logout = async (req: Request, res: Response) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    res.status(200).send({
        message: 'Logged out',
    });
};
