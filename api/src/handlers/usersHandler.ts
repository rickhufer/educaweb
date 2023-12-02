import { Request, Response } from 'express';
import {
  loginUser,
  profileUser,
  registerUser,
} from '../controllers/usersController';

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const message = await registerUser(email, password);

    return res.status(200).json({ message });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const profileUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.id;
    console.log('IDDDD: ', userId);

    const user = await profileUser(userId);
    return res.status(200).json(user);
  } catch (error: any) {
    console.log('Aqui si????');

    return res.status(400).json({ error: error.message });
  }
};
