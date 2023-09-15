import mongoose from 'mongoose';

const mongo_uri = 'mongodb://127.0.0.1:27017/todoDB';

const databaseMiddleware = async (req,res,next) => {
  try {
    await mongoose.connect(mongo_uri);
    console.log(`==========connected to db==========`);
    next()
  } catch (err) {
    console.log(err, `===========error to db==========`);
  }
};

export default databaseMiddleware
