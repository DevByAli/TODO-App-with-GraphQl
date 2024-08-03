import Joi from "joi";

const LoginDto = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
  }),
});

export default LoginDto;
