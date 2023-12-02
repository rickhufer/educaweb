import { Router } from 'express';
import { Request, Response } from 'express';
import userRoutes from './userRoutes';

const mainRouter = Router();

mainRouter.get('/test', (req: Request, res: Response) => {
  res.status(200).send('GET /test');
});

mainRouter.use('/users', userRoutes);

export default mainRouter;
