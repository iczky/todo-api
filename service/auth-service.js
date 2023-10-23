import { User } from "../schema/todos-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateLoginToken } from "../utils/generateToken.js";
import config from "../config/config.js";

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.insertMany({
        username,
        password: hashedPassword,
        role,
      });

      res.status(200).json({
        message: "Successfully Registered",
        data: user,
      });
    } else {
      throw new Error("Username already exist");
    }
  } catch (error) {
    console.log(error, `==========error register=========`);
    res.status(400).json({
      message: "cant register",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    try {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const { accessToken, refreshToken } = generateLoginToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          message: "success login",
          data: accessToken,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "cant login/password is wrong",
      });
    }
  } else {
    res.status(400).json({
      message: "Username is not available",
    });
  }
};

const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) return res.sendStatus(401); // No token provided
  jwt.verify(refreshToken, config.refreshSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    const accessToken = jwt.sign(
      { username: user.username },
      config.accessSecret,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  });
};

export { register, login, refresh };
