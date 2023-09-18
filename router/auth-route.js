import { Router } from 'express';
import {register, login} from '../service/auth-service.js';
import getAllUser from '../service/user-service.js';
import authorizationMiddleware from '../middleware/authorization-middleware.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/users', authorizationMiddleware, getAllUser)

export default authRouter;