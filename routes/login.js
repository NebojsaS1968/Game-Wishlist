const express = require('express')
const router = express.Router()

const { validation } = require("../middlewares/validation/validation")
const { checkSessProtect, checkSessLoged } = require('../middlewares/auth/session')

const {
    loginSchema
  } = require("../middlewares/validation/schemas/login")

  const LoginC = require('../controllers/login')

  const {
    login
} = LoginC

router.route('/')
.post(validation(loginSchema), checkSessLoged, login)

module.exports = router