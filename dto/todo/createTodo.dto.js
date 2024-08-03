import Joi from "joi";

const CreateTodoDto = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().min(20).required().messages({
    "string.min": "Description must be at least 20 characters",
  }),
  status: Joi.string().valid("active", "inactive").default("active").messages({
    "any.only": "Status must be either active or inactive",
  }),
});

export default CreateTodoDto;