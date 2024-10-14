import { Request, Response } from 'express';
import { prisma } from '../db';

export const register = async (req: Request, res: Response) => {
    const { nombre, apellido, correo, contrasenia, cargo, rango } = req.body;
};

export const login = async (req: Request, res: Response) => {
    res.send('Login');
};
