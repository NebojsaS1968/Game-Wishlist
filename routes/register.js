const express = require('express')
const router = express.Router()

const { validation } = require("../middlewares/validation/validation")
const { registerValid } = require('../middlewares/validation/register')

const {
    addUserSchema,
    updateUserSchema,
  } = require("../middlewares/validation/schemas/user")

  const RegisterC = require('../controllers/register')

  const {
    register
} = RegisterC

router.route('/')
.post(validation(addUserSchema), registerValid, register)

module.exports = router