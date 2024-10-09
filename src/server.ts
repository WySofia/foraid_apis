import express from 'express';
import authRoutes from './auth/auth.routes';
import { authenticateJWT } from './middlewares/auth.middleware';

export const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/protected', authenticateJWT, (req, res) => {
    const user = req.user;
    res.json({ message: 'This is a protected route', user });
});
