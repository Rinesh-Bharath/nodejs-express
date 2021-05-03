import pkg from 'joi';
const Joi = pkg;

export const createSchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number(),
  color: Joi.string()
});

export const readSchema = Joi.object({
  product_id: Joi.string(),
  name: Joi.string().min(3).max(30),
  price: Joi.number(),
  color: Joi.string()
});

export const updateSchema = Joi.object({
  user_id: Joi.string().required(),
  product_id: Joi.string().required(),
  name: Joi.string().min(3).max(30),
  price: Joi.number(),
  color: Joi.string()
});

export const deleteSchema = Joi.object({
  product_id: Joi.string().required()
});

export const searchSchema = Joi.object({
  user_id: Joi.string(),
  product_id: Joi.string(),
  name: Joi.string().min(3).max(30),
  price: Joi.number(),
  color: Joi.string()
});
