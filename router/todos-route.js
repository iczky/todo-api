import { Router } from "express";
import {
  postTodos,
  updateTodos,
  deleteByIdTodos,
  getAllTodos,
  getByIdTodos,
} from "../service/todos-service.js";
import authorizationMiddleware from "../middleware/authorization-middleware.js";

const todosRoute = Router();

//post to-do-list
todosRoute.post("/todos", postTodos);

//update the todo
todosRoute.put("/todos/:id", updateTodos);

//delete by id
todosRoute.delete("/todos/:id", deleteByIdTodos);

//get by id
todosRoute.get("/todos/:id", authorizationMiddleware, getByIdTodos);

//get all
todosRoute.get("/todos", getAllTodos);

export default todosRoute;
