const User = require('../models/user')

// Get all
const getAllUsers = async (req, res, next) => {
    const users = await User.find({})
    res.status(200).send({ allUsers: users })
}

// Delete all
const deleteAllUsers = async (req, res, next) => {
    await User.deleteMany()
    res.status(200).send({ msg: "All users deleted!" })
}

module.exports = {
    getAllUsers,
    deleteAllUsers
}