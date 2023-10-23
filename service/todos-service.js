import { Todo } from "../schema/todos-schema.js";

//post to-do-list
const postTodos = async (req, res) => {
  const { activity, dueDate, priority, category } = req.body;
  const createdBy = req.user.id;
  console.log(req.user);
  try {
    const todo = await Todo.insertMany({
      activity,
      dueDate,
      priority,
      category,
      createdBy: createdBy,
    });
    console.log(`============Success insert===============`);

    res.status(200).json({
      message: "success",
      data: todo,
    });
  } catch (error) {
    console.log(error.message, `=============error===========`);
    res.status(400).json({
      message: error.message,
    });
  }
};

//update the todo
const updateTodos = async (req, res) => {
  const { id } = req.params;
  const todoBody = req.body;

  try {
    const todo = await Todo.updateOne({ _id: id }, todoBody);
    res.status(200).json({
      message: "success",
      data: todo,
    });
  } catch (error) {
    console.log(error.errors, `=============error===========`);
    res.status(400).json({
      message: error.message,
    });
  }
};

//delete by id
const deleteTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "success",
      data: todo,
      deletedBy: req.user.id,
    });
  } catch (error) {
    console.log(error, `=============error===========`);
    res.status(400).json({
      message: error,
    });
  }
};

//get by id
const getByIdTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    console.log(`===========Id Found=============`);

    res.status(200).json({
      message: "success",
      data: todo,
    });
  } catch (error) {
    console.log(error.message, `=============error===========`);
    res.status(400).json({
      message: "incorrect id",
    });
  }
};

//get all
const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find({});
    console.log(`============Success get all=========`);

    res.status(200).json({
      message: "success",
      data: todo,
    });
  } catch (error) {
    console.log(error, `============error==========`);
    res.status(400).json({
      message: "incorrect data",
    });
  }
};

export { postTodos, updateTodos, getAllTodos, getByIdTodos, deleteTodos };
