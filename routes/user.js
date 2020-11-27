const express = require('express')
const router = express.Router()

const { validation } = require("../middlewares/validation/validation")
const { registerValid } = require('../middlewares/validation/register')
const { checkSessProtect, checkSessLoged } = require('../middlewares/auth/session')

const {
  addUserSchema,
  updateUserSchema,
} = require("../middlewares/validation/schemas/user")

const LoginC = require('../controllers/login')
const RegisterC = require('../controllers/register')
const UserC = require('../controllers/user')

const {
    login,
    logout
} = LoginC
const {
    register
} = RegisterC
const {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = UserC

router.route('/')
.get(checkSessProtect, getAllUsers)
.delete(checkSessProtect, deleteAllUsers)

router.route('/:id')
.get(getUserById)
.delete(deleteUser)
.patch(validation(updateUserSchema), updateUser)

router.post('/login', checkSessLoged, login)
router.post('/register', validation(addUserSchema), registerValid, register)
router.post('/logout', logout)

module.exports = router