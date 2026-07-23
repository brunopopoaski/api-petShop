import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export default function createToken(payload) {
  if (!env.JWT_SECRET) {
    throw createError('JWT_SECRET não configurado.', 500);
  }
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.EXPIREIN});
}