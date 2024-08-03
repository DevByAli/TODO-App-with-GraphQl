import Joi from "joi";

export default deleteTodoDto = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "TodoID is required",
  }),
});
