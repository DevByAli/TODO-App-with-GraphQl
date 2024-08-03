import * as AuthService from "../../services/auth.service.js";

export const Signup = async (userInfo) => {
  return await AuthService.Signup(userInfo);
};

export const Login = async (userInfo) => {
  return await AuthService.CheckCredentials(userInfo);
};
