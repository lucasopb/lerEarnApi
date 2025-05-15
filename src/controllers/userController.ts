import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser, updateUser, deleteUser } from "../repository/userRepository";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userDto: CreateUserDto = req.body;
    const result = await registerUser(userDto);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userDto: UpdateUserDto = req.body;
    const updatedUser = await updateUser(id, userDto);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
