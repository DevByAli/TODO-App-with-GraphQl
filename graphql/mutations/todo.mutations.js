import * as TodoService from "../../services/todo.service.js";

export const createTodo = async (userId, todo) => {
  return await TodoService.CreateTodo(userId, todo);
};

export const deleteTodo = async (userId, todoId) => {
  const todo = await TodoService.deleteTodo(userId, todoId);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
};

export const updateTodo = async (userId, todoId, todo) => {
  const updatedTodo = await TodoService.UpdateTodoById(userId, todoId, todo);
  if (!updatedTodo) {
    throw new Error("Todo not found");
  }
  return updatedTodo;
};
