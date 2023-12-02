import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY || '';

interface DecodedToken {
  userId: number;
  used: boolean;
}

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

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: Function,
): Promise<void> => {
  const userId = verifyToken(req);

  if (userId !== null) {
    // Aquí deberías marcar el token como utilizado después de autenticar con éxito,
    // antes de continuar con la ejecución
    const tokenUsed = await markTokenAsUsed(req);

    if (tokenUsed) {
      res.status(401).json({ error: 'Token ya utilizado' });
    } else {
      req.body.id = userId;
      next();
    }
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
        const decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
        return decodedToken.userId;
      } catch (error) {
        return null;
      }
    }
  }

  return null;
};

const markTokenAsUsed = async (req: Request): Promise<boolean> => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && typeof authorizationHeader === 'string') {
    const token = authorizationHeader.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;

        // Si el token ya ha sido utilizado, devuelve true
        if (decodedToken.used) {
          return true;
        }

        // Marcar el token como utilizado
        decodedToken.used = true;
        // Aquí deberías almacenar el token actualizado en tu base de datos o en una lista negra

        return false;
      } catch (error) {
        // Maneja cualquier error durante la verificación del token
        return true;
      }
    }
  }

  return true;
};
