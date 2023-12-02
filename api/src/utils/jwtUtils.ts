import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY || '';

export const generateToken = async (userId: number): Promise<string> => {
  try {
    const token = await jwt.sign({ userId, used: false }, SECRET_KEY, {
      expiresIn: '365d',
    });
    return token;
  } catch (error) {
    throw new Error('Error al generar el token');
  }
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: Function,
): void => {
  const userId = verifyToken(req);

  if (userId !== null) {
    req.body.id = userId;
    next();
  } else {
    res.status(401).json({ error: 'Token no válido' });
  }
};

export const verifyToken = (req: Request): number | null => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && typeof authorizationHeader === 'string') {
    const token = authorizationHeader.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY) as {
          userId: number;
        };
        return decodedToken.userId;
      } catch (error) {
        return null;
      }
    }
  }

  return null;
};
