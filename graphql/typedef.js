import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type SignupSuccess {
    success: Boolean
    user: User
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    success: Boolean
    message: String
  }

  type ErrorResponse {
    success: Boolean
    message: String
  }

  type Query {
    isLoggedIn: LoginResponse # New field to check if user is logged in
    todos: GetAllTodosResponse
    todo(id: ID!): GetTodoByIdResponse
    user: UserResponse
  }

  type Todo {
    _id: ID!
    title: String!
    description: String!
    status: String!
    user: String!
  }

  type TodoList {
    todos: [Todo]
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input CreateTodoInput {
    title: String!
    description: String!
  }

  input UpdateTodoInput {
    title: String
    description: String
    status: String
  }

  type Mutation {
    signup(userInfo: SignupInput): SignupResponse
    login(userInfo: LoginInput): LoginResponse

    createTodo(todo: CreateTodoInput): CreateTodoResponse
    deleteTodo(id: ID!): DeleteTodoResponse
    updateTodo(id: ID!, todo: UpdateTodoInput): UpdateTodoResponse
  }

  union UserResponse = User | ErrorResponse
  union CreateTodoResponse = Todo | ErrorResponse
  union SignupResponse = SignupSuccess | ErrorResponse
  union GetAllTodosResponse = TodoList | ErrorResponse
  union GetTodoByIdResponse = Todo | ErrorResponse
  union DeleteTodoResponse = Todo | ErrorResponse
  union UpdateTodoResponse = Todo | ErrorResponse
`;

export default typeDefs;
