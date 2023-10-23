import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateLoginToken = (user) => {
  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
      role: user.role,
    },
    config.accessSecret,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
      role: user.role,
    },
    config.refreshSecret,
    { expiresIn: "15m" }
  );

  return { accessToken, refreshToken };
};

export { generateLoginToken };
