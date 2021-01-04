const express = require('express')
const router = express.Router()

const { validation } = require("../middlewares/validation/validation")
const { checkSessProtect, checkSessLoged } = require('../middlewares/auth/session')

const {
  addUserSchema,
  updateUserSchema,
} = require("../middlewares/validation/schemas/user")

const UserC = require('../controllers/user')


const {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addToWishlist
} = UserC

router.route('/')
.get( getAllUsers)
.delete(checkSessProtect, deleteAllUsers)

router.route('/:id')
.get(getUserById)
.delete(deleteUser)
.patch(validation(updateUserSchema), updateUser)
.post(addToWishlist)

module.exports = router