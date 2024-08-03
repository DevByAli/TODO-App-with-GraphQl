import Joi from "joi";

const SignUpDto = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required",
        "string.base": "Name should be a string",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a string",
        "string.email": "Email is invalid",
        "string.empty": "Email is required",
    }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            "string.base": "Password should be a string",
            "string.pattern.base":
                "Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character",
            "string.min": "Password should be at least 8 characters long",
            "string.empty": "Password is required",
        }),
});

export default SignUpDto;
