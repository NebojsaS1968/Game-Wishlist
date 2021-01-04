const Joi = require("joi");

const loginSchema = Joi.object({
  password: Joi.string().required().min(6).max(15),
  email: Joi.string().required().email()
});

module.exports = { loginSchema }