import { Router } from 'express';
import {
    logout,
    register,
    login,
    verifyToken,
} from '../controllers/auth.controller';

export const authRouter: Router = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', verifyToken, logout);
authRouter.get('/verify', verifyToken);
