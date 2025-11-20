import { verifyToken } from '../utils/token.js';

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      const error = new Error('Authentication token missing');
      error.status = 401;
      throw error;
    }

    req.user = verifyToken(token);
    next();
  } catch (error) {
    error.status = error.name === 'JsonWebTokenError' ? 401 : error.status;
    next(error);
  }
};

