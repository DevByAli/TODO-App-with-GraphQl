import authenticationAndErrorHandler from "./middlewares/authenticationAndErrorHandler.middleware.js";
import { Login, Signup } from "./mutations/auth.mutations.js";
import {
  createTodo,
  deleteTodo,
  updateTodo,
} from "./mutations/todo.mutations.js";
import { getAllTodo, getTodo } from "./queries/todo.queries.js";

const resolvers = {
  Query: {
    isLoggedIn: authenticationAndErrorHandler(async (_, args, context) => ({
      success: true,
      message: "User is logged in",
    })),

    todos: authenticationAndErrorHandler(async (_, args, context) => {
      return getAllTodo(context.request.session.user._id);
    }),

    todo: authenticationAndErrorHandler(async (_, args, context) => {
      const userId = context.request.session.user._id;
      return getTodo(userId, args.id);
    }),

    user: authenticationAndErrorHandler(async (_, args, context) => {
      return context.request.session.user;
    }),
  },

  Mutation: {
    signup: async (_, args) => {
      try {
        const user = await Signup(args.userInfo);
        return {
          success: true,
          user,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    login: async (_, args, context) => {
      try {
        const user = await Login(args.userInfo);

        context.request.session.user = user;
        return {
          success: true,
          message: "User logged in successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    createTodo: authenticationAndErrorHandler(async (_, args, context) => {
      const userId = context.request.session.user._id;

      return createTodo(userId, args.todo);
    }),

    deleteTodo: authenticationAndErrorHandler(async (_, args, context) => {
      const userId = context.request.session.user._id;

      return deleteTodo(userId, args.id);
    }),

    updateTodo: authenticationAndErrorHandler(async (_, args, context) => {
      const userId = context.request.session.user._id;

      return updateTodo(userId, args.id, args.todo);
    }),
  },

  UserResponse: {
    __resolveType(obj) {
      return obj._id ? "User" : "ErrorResponse";
    },
  },

  SignupResponse: {
    __resolveType(obj) {
      return obj.success === true ? "SignupSuccess" : "ErrorResponse";
    },
  },

  CreateTodoResponse: {
    __resolveType(obj) {
      return obj._id ? "Todo" : "ErrorResponse";
    },
  },

  GetAllTodosResponse: {
    __resolveType(obj) {
      return obj.todos ? "TodoList" : "ErrorResponse";
    },
  },

  GetTodoByIdResponse: {
    __resolveType(obj) {
      return obj._id ? "Todo" : "ErrorResponse";
    },
  },

  DeleteTodoResponse: {
    __resolveType(obj) {
      return obj._id ? "Todo" : "ErrorResponse";
    },
  },

  UpdateTodoResponse: {
    __resolveType(obj) {
      return obj._id ? "Todo" : "ErrorResponse";
    },
  },
};

export default resolvers;
