import { Router } from 'express';
import {
  postTodos,
  updateTodos,
  deleteTodos,
  getAllTodos,
  getByIdTodos,
} from '../service/todos-service.js';
import authorizationMiddleware from '../middleware/authorization-middleware.js';

const todosRoute = Router();

//post to-do-list
todosRoute.post('/todos', postTodos);

//update the todo
todosRoute.put('/todos/:id', updateTodos);

//delete by id
todosRoute.delete('/todos/:id', authorizationMiddleware, deleteTodos);

//get by id
todosRoute.get('/todos/:id', getByIdTodos);

//get all
todosRoute.get('/todos', authorizationMiddleware, getAllTodos);

export default todosRoute;
