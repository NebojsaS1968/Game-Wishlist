const express = require('express')
const router = express.Router()

const { checkSessProtect, checkSessLoged } = require('../middlewares/auth/session')

const LoginC = require('../controllers/login')

const {
    logout
} = LoginC

router.route('/')
.post(checkSessProtect, logout)

module.exports = router