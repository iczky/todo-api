import { JWT_SIGN } from '../config/jwt.js';
import jwt from 'jsonwebtoken';

const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: 'Not Authorized',
    });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const decodeToken = jwt.verify(token, JWT_SIGN);

      if (decodeToken.role === 'admin') {
        next();
      } else {
        res.status(401).json({
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      res.status(400).json({
        message: 'error',
        error: error,
      });
    }
  }
};

export default authorizationMiddleware;
