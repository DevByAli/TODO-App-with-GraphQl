import TodoModel from "../models/todo.model.js";

export const CreateTodo = async (userId, createTodoDto) => {
  return await TodoModel.create({user: userId, ...createTodoDto});
};

export const GetAllTodos = async (userId) => {
  return await TodoModel.find({ user: userId });
};

export const GetTodoById = async (userId, todoId) => {
  return await TodoModel.findOne({ user: userId, _id: todoId });
};

export const UpdateTodoById = async (userId, todoId, updateTodoDto) => {
  return await TodoModel.findOneAndUpdate(
    { user: userId, _id: todoId },
    updateTodoDto,
    { new: true }
  );
};

export const DeleteTodoById = async (userId, todoId) => {
  return await TodoModel.findOneAndDelete({ user: userId, _id: todoId });
};
