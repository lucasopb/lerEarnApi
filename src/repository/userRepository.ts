import { AppDataSource } from '../config/dataSource';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';

const repository = AppDataSource.getRepository(User);

export const registerUser = async (userDto: CreateUserDto): Promise<{ user: UserResponseDto; token: string }> => {
  const existingUser = await repository.findOne({ where: { email: userDto.email } });
  if (existingUser) throw new Error('Email já cadastrado');

  const hashedPassword = await bcrypt.hash(userDto.password, 10);
  const newUser = repository.create({
    ...userDto,
    password: hashedPassword
  });
  await repository.save(newUser);

  const token = generateToken({ id: newUser.id });
  const userResponse: UserResponseDto = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  };

  return { user: userResponse, token };
};

export const loginUser = async (email: string, password: string): Promise<{ user: UserResponseDto; token: string }> => {
  const user = await repository.findOne({ where: { email } });
  if (!user) throw new Error('Email ou senha inválidos');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Email ou senha inválidos');

  const token = generateToken({ id: user.id });
  const userResponse: UserResponseDto = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  return { user: userResponse, token };
};

export const updateUser = async (id: string, userDto: UpdateUserDto): Promise<UserResponseDto> => {
  const user = await repository.findOne({ where: { id } });
  if (!user) throw new Error('User not found');

  if (userDto.password) {
    userDto.password = await bcrypt.hash(userDto.password, 10);
  }

  Object.assign(user, userDto);
  await repository.save(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
};

export const deleteUser = async (id: string): Promise<void> => {
  const result = await repository.delete(id);
  if (result.affected === 0) throw new Error('User not found');
};

export const getMe = async (userId: string): Promise<UserResponseDto> => {
  const user = await repository.findOneBy({ id: userId });
  if (!user) throw new Error('Usuário não encontrado');
  return { id: user.id, name: user.name, email: user.email };
};
