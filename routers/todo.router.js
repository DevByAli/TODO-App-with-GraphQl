import * as TodoController from "../controllers/todo.controller.js";
import { Router } from "express";
import IdValidationMiddleware from "../middlewares/idValidation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const TodoRouter = Router();

const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

TodoRouter.get("/", authMiddleware, asyncMiddleware(TodoController.GetAllTodos));
TodoRouter.post("/", authMiddleware, asyncMiddleware(TodoController.CreateTodo));

TodoRouter.get(
    "/:id",
    authMiddleware,
    IdValidationMiddleware,
    asyncMiddleware(TodoController.GetTodoById)
);

TodoRouter.patch(
    "/:id",
    authMiddleware,
    IdValidationMiddleware,
    asyncMiddleware(TodoController.UpdateTodo)
);
TodoRouter.delete(
    "/:id",
    authMiddleware,
    IdValidationMiddleware,
    asyncMiddleware(TodoController.DeleteTodo)
);

export default TodoRouter;
