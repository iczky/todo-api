import { Router } from 'express';
import { register, login } from '../service/auth-service.js';
import { getAllUser, getUserById } from '../service/user-service.js';
import authorizationMiddleware from '../middleware/authorization-middleware.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/', authorizationMiddleware, getAllUser);
authRouter.get('/:id', authorizationMiddleware, getUserById);

export default authRouter;
