// src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment');
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error('Missing JWT_EXPIRES_IN in environment');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
