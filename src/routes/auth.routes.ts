import { Router } from 'express';
import { logout, register, login } from '../controllers/auth.controller';

export const authRouter: Router = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
