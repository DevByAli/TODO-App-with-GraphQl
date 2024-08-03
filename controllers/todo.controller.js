import * as TodoService from "../services/todo.service.js";
import { StatusCodes } from "http-status-codes";
import CreateUserDto from "../dto/todo/createTodo.dto.js";
import UpdateTodoDto from "../dto/todo/updateTodo.dto.js";

export const CreateTodo = async (req, res) => {
  await CreateUserDto.validateAsync(req.body);

  const userId = req.session.user._id;
  const newTodo = await TodoService.CreateTodo(userId, req.body);

  res.status(StatusCodes.CREATED).json({ success: true, todo: newTodo });
};

export const GetAllTodos = async (req, res) => {
  const userId = req.session.user._id;

  const todos = await TodoService.GetAllTodos(userId);

  res.status(StatusCodes.OK).json({ success: true, todos });
};

export const GetTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user._id;

  const todo = await TodoService.GetTodoById(userId, id);

  res.status(StatusCodes.OK).json({ success: true, todo });
};

export const GetTodoById = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user._id;

  const todo = await TodoService.GetTodoById(userId, id);

  res.status(StatusCodes.OK).json({ success: true, todo });
};

export const UpdateTodo = async (req, res) => {
  await UpdateTodoDto.validateAsync(req.body);

  const { id } = req.params;
  const userId = req.session.user._id;

  const updatedTodo = await TodoService.UpdateTodoById(userId, id, req.body);

  res.status(StatusCodes.OK).json({ success: true, todo: updatedTodo });
};

export const DeleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user._id;

  await TodoService.DeleteTodoById(userId, id);

  res.status(StatusCodes.NO_CONTENT).json();
};
