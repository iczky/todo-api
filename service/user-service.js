import { User } from '../schema/todos-schema.js';

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.find({ _id: id });
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err,
    });
  }
};

// const deleteById = async (req,res)=>{
//   const {id} = req.params

//   try {
//     const user = await User.find({id})

//   } catch (error) {

//   }
// }

export { getAllUser, getUserById };
