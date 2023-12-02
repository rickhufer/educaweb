import { User } from '../db';
import { UserModelInstance } from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';
import {
  DUPLICATE_USER_ERROR,
  USER_NOT_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
  INCORRECT_PASSWORD_ERROR,
} from '../constants/messages.es';

export const registerUser = async (email: string, password: string) => {
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { email, password },
  });

  if (!created) {
    throw new Error(DUPLICATE_USER_ERROR);
  }

  return `El usuario ${
    (newUser as UserModelInstance).email
  } fue creado exitosamente`;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error(USER_NOT_FOUND_ERROR);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    (user as UserModelInstance).password,
  );

  if (!isPasswordValid) {
    throw new Error(INCORRECT_PASSWORD_ERROR);
  }

  const token = generateToken((user as UserModelInstance).id);

  return token;
};

export const profileUser = async (id: number) => {
  const user = await User.findOne({ where: { id } });

  if (!user) {
    throw new Error(USER_NOT_EXISTS_ERROR);
  }

  return { ...user.dataValues, password: undefined };
};
