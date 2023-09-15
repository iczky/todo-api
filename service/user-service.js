import { User } from '../schema/todos-schema.js';

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({
        message: 'Success',
        data:  user
    })
  } catch (error) {
    res.status(500).json({
        message: 'Server error',
        error: error
    })
  }
};

export default getAllUser