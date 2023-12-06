import { Router, type Request, type Response } from 'express';

import {
  loginUserHandler,
  profileUserHandler,
  registerUserHandler,
} from '../handlers/usersHandler';
import { authenticateToken } from '../utils/jwtUtils';

export const userRoutes = Router();

userRoutes.get('/', authenticateToken, profileUserHandler);
userRoutes.post('/register', registerUserHandler);
userRoutes.delete('/unregister', registerUserHandler);
userRoutes.post('/login', loginUserHandler);
userRoutes.post('/logout', registerUserHandler);
userRoutes.get('/all', authenticateToken, (req: Request, res: Response) => {
  res.status(200).send('GET /users');
});
