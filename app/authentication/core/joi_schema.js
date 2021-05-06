import pkg from 'joi';
const Joi = pkg;

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).max(10).required()
});
