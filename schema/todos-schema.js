import { Schema } from 'mongoose';
import mongoose from 'mongoose';

//define the schema
const todoSchema = new Schema({
  activity: {
    type: String,
    required: true,
  },
  dueDate: String,
  priority: {
    type: String,
    enum: {
      values: ['high', 'medium', 'low'],
      message: '{VALUE} is not supported',
    },
  },
  category: {
    type: String,
    enum: ['shopping', 'eating', 'studying', 'gaming', 'playing'],
  },
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not supported'
        }
    }
})

//build the model
const Todo = mongoose.model('Todos', todoSchema);
const User = mongoose.model('Users', userSchema);

export{
    Todo,
    User
};
