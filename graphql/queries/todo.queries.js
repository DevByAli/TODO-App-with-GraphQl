import * as TodoService from "../../services/todo.service.js";

export const getAllTodo = async (userId) => {
  const todos = await TodoService.GetAllTodos(userId);
  return { todos };
};

export const getTodo = async (userId, todoId) => {
  const todo = await TodoService.GetTodoById(userId, todoId);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
};
