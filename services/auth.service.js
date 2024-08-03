import UserModel from "../models/user.model.js";

export const Signup = async (user) => {
  const isUserExist = await UserModel.findOne({ email: user.email });
  if (isUserExist) {
    throw new Error("User already exist");
  }

  const newUser = await UserModel.create(user);
  newUser.password = undefined;

  return newUser;
};

export const CheckCredentials = async (LoginUserDto) => {
  const { email, password } = LoginUserDto;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  user.password = undefined;
  return user;
};
