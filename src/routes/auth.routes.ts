import { Router } from 'express';
import { logout, register, login } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
