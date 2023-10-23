import config from "../config/config.js";
import jwt, { decode } from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    try {
      const token = authHeader.split(" ")[1];
      const decodeToken = jwt.verify(token, config.accessSecret);
      req.user = decodeToken;

      decodeToken;
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
};

export default authMiddleware;
