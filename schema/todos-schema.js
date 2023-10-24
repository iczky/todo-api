import { Schema } from "mongoose";
import mongoose from "mongoose";

//define the schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

const todoSchema = new Schema(
  {
    activity: {
      type: String,
      required: true,
    },
    dueDate: String,
    priority: {
      type: String,
      enum: {
        values: ["high", "medium", "low"],
        message: "{VALUE} is not supported",
      },
    },
    category: {
      type: String,
      enum: ["shopping", "eating", "studying", "gaming", "playing"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      alias: "_id", // Use alias to rename the field to _id
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//build the model
const Todo = mongoose.model("Todos", todoSchema);
const User = mongoose.model("Users", userSchema);

export { Todo, User };
