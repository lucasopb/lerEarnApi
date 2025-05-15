import { AppDataSource } from '../config/dataSource';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

const repository = AppDataSource.getRepository(User);

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await repository.findOne({ where: { email } });
  if (existingUser) throw new Error('Email já cadastrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = repository.create({ name, email, password: hashedPassword });
  await repository.save(newUser);

  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

export const loginUser = async (email: string, password: string) => {
  const user = await repository.findOne({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Credenciais inválidas');

  const token = generateToken({ id: user.id, email: user.email });
  return { token };
};

export const getMe = async (userId: string) => {
  const user = await repository.findOneBy({ id: userId });
  if (!user) throw new Error('Usuário não encontrado');
  return { id: user.id, name: user.name, email: user.email };
};
