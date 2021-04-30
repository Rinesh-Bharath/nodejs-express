import pkg from 'joi';
const Joi = pkg;

export const createSchema = Joi.object({
  display_name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number(),
  first_name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(30).required(),
  last_name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(30).required(),
  email: Joi.string().email().required(),
  user_id: Joi.string().required()
});

export const readSchema = Joi.object({
  display_name: Joi.string().alphanum(),
  age: Joi.number()
});

export const updateSchema = Joi.object({
  display_name: Joi.string().alphanum().min(3).max(30),
  age: Joi.number(),
  first_name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(30),
  last_name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(30),
  email: Joi.string().email(),
  user_id: Joi.string().required()
});

export const deleteSchema = Joi.object({
  user_id: Joi.string().required()
});

export const searchSchema = Joi.object({
  display_name: Joi.string().alphanum().min(3).max(30),
  age: Joi.number(),
  first_name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(30),
  last_name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(30),
  email: Joi.string().email(),
  user_id: Joi.string()
});
