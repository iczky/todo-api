import { User } from "../schema/todos-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
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
        const { accessToken, refreshToken, accessExpire, refreshExpire } =
          generateToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          expire: refreshExpire,
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          expire: accessExpire,
        });

        res.status(200).json({
          message: "success login",
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
  const Token = req.cookies.refreshToken;

  if (!Token) {
    res.status(401).json({
      message: "no refresh token",
    });
  }

  try {
    jwt.verify(Token, config.refreshSecret, function (err, decoded) {
      if (err) return res.sendStatus(403); // Forbidden
      const { accessToken, accessExpire } = generateToken(decoded);

      res.clearCookie("accessToken");

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        expire: accessExpire,
      });
      res.status(200).json({
        message: "refresh complete",
        decoded,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send("Logout Success");
};

export { register, login, refresh, logout };
