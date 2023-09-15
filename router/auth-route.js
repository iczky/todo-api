import { Router } from 'express';
import register from '../service/auth-service.js';
import getAllUser from '../service/user-service.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.get('/users', getAllUser)

export default authRouter;