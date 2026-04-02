import { Router } from 'express';
import { register, login, getUser } from '../controllers/auth.controller';
import { authenticate, validateLogin, validateRegister } from '../middlewares/auth.middleware';
const router = Router();
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', authenticate, getUser);
export default router;
