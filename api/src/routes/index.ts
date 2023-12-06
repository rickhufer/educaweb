import { Router, type Request, type Response } from 'express';

import userRoutes from './userRoutes';

export const mainRouter = Router();

mainRouter.get('/test', (req: Request, res: Response) => {
  res.status(200).send('GET /test');
});

mainRouter.use('/users', userRoutes);
