import Joi from "joi";

const UpdateTodoDto = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().min(20).optional().messages({
    "string.min": "Description must be at least 20 characters",
  }),
  status: Joi.string().valid("active", "inactive").optional().messages({
    "any.only": "Status must be either active or inactive",
  }),
});

export default UpdateTodoDto;
