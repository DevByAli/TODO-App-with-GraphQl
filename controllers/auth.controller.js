import { StatusCodes } from "http-status-codes";
import SignUpDto from "../dto/auth/signup.dto.js";
import LoginDto from "../dto/auth/login.dto.js";
import * as AuthService from "../services/auth.service.js";

export const SignUp = async (req, res) => {
  await SignUpDto.validateAsync(req.body);

  const newUser = await AuthService.Signup(req.body);
  
  res.status(StatusCodes.CREATED).json({ success: true, user: newUser });
};

export const Login = async (req, res) => {
  await LoginDto.validateAsync(req.body);

  const user = await AuthService.CheckCredentials(req.body);
  if (user) {
    req.session.user = user;

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User logged in successfully",
    });
  }
};
