import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export const generateToken = (payload, options = {}) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiry,
    ...options,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};

