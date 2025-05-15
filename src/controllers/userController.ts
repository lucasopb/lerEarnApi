import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getMe } from '../repository/userRepository';

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getMe((req as any).user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
