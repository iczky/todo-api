import { JWT_SIGN } from '../config/jwt.js';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if (!authHeader) {
    res.status(401).json({
      error: 'Unauthorized',
    });
  } else {
    try {
      jwt.verify(token, JWT_SIGN);
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
};

export default authMiddleware;
