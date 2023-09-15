import { User } from '../schema/todos-schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SIGN } from '../config/jwt.js';

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
        message: 'Successfully Registered',
        data: user,
      });
    } else {
      throw new Error('Username already exist');
    }
  } catch (error) {
    console.log(error, `==========error register=========`);
    res.status(400).json({
      message: 'cant register',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  console.log(user, `===user====`);
  console.log(JWT_SIGN);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        role: user.role,
      },
      JWT_SIGN
    );

    res.status(200).json({
      message: 'success login',
      data: token,
    });
  } else {
    res.status(400).json({
      message: 'Login Failed',
    });
  }
};

export { register, login };
