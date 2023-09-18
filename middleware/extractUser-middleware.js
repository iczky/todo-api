import { JWT_SIGN } from '../config/jwt.js';
import jwt from 'jsonwebtoken';

const extractUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next()
  }
  try {
    const token = authHeader.split(' ')[1];
    const decodeToken = jwt.verify(token, JWT_SIGN);
    req.user = decodeToken;

    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid Token',
      error: error,
    });
  }
};

export default extractUser;
