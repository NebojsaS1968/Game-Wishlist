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

// Get by id
const getUserById = async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).send({ user: user })
}

// Update user
const updateUser = async (req, res, next) => {
    const { id } = req.params
    const update = req.body
    const user = await User.findByIdAndUpdate(id, update)
    if(!user) {
        return res.send({ msg: "User with that id doesn't exist." })
    }
    const save = await user.save()
    res.status(201).send({ msg: "User updated.", user: save })
}

// Delete user by id
const deleteUser = async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if(!user) {
        return res.send({ msg: "User with that id doesn't exist." })
    }
    res.status(200).send({ msg: `User ${user.name} deleted.` })
}

module.exports = {
    getAllUsers,
    deleteAllUsers,
    deleteUser,
    updateUser,
    getUserById
}