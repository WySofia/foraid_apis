import { Request, Response } from 'express';
import * as AuthService from './auth.service';
import { z } from 'zod';
import { validateLogin, validateRegister } from './auth.validation';

export const register = async (req: Request, res: Response) => {
    const result = validateRegister.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
    }

    try {
        const user = await AuthService.register(result.data);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const result = validateLogin.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
    }

    try {
        const token = await AuthService.login(result.data);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
