const Joi = require("joi");

const addUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(6).max(15),
  email: Joi.string().required().email(),
  password2: Joi.string().required().min(6).max(15),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  password: Joi.string().min(6).max(15),
  email: Joi.string().email()
});

module.exports = {
    addUserSchema,
    updateUserSchema
}