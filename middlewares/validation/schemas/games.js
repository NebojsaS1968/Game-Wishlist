const Joi = require("joi");

const addGameSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  year: Joi.number().required().max(2100).min(1800).integer(),
  price: Joi.number().required(),
  publisher: Joi.string().required(),
  rating: Joi.number().required().max(100).min(0)
});

const updateGameSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  year: Joi.number().max(2100).min(1800).integer(),
  price: Joi.number(),
  publisher: Joi.string(),
  rating: Joi.number().max(100).min(0)
});

module.exports = { addGameSchema, updateGameSchema };