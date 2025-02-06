import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  status: Joi.string().valid("pending", "completed"),
  dueDate: Joi.date(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  status: Joi.string().valid("pending", "completed"),
  dueDate: Joi.date(),
});
