const Joi = require("joi");

const addGameSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  year: Joi.number().required(),
  price: Joi.number().required(),
  publisher: Joi.string().required(),
  rating: Joi.number().required(),
  discount: Joi.number().required(),
});

const updateGameSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  year: Joi.number(),
  price: Joi.number(),
  publisher: Joi.string(),
  rating: Joi.number(),
  discount: Joi.number(),
});

module.exports = { addGameSchema, updateGameSchema };