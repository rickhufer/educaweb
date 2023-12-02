import { Router } from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../utils/jwtUtils';
import {
  registerUserHandler,
  loginUserHandler,
  profileUserHandler,
} from '../handlers/usersHandler';

const userRoutes = Router();

userRoutes.get('/', authenticateToken, profileUserHandler);
userRoutes.post('/register', registerUserHandler);
userRoutes.delete('/unregister', registerUserHandler);
userRoutes.post('/login', loginUserHandler);
userRoutes.post('/logout', registerUserHandler);
userRoutes.get('/all', authenticateToken, (req: Request, res: Response) => {
  res.status(200).send('GET /users');
});

export default userRoutes;
