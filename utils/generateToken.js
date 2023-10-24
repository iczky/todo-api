import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (user) => {
  const accessExpire = 900000;
  const refreshExpire = 7 * 24 * 60 * 60 * 1000;

  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
      role: user.role,
    },
    config.accessSecret,
    { expiresIn: accessExpire }
  );

  const refreshToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
      role: user.role,
    },
    config.refreshSecret,
    { expiresIn: refreshExpire }
  );

  return { accessToken, refreshToken, accessExpire, refreshExpire };
};

export { generateToken };
