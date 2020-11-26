const User = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()
const {
    SESS_NAME
} = process.env

const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        return res.status(400).send({ msg: "User with that email is not found." })
    } 

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
        return res.status(400).send({ msg: "Wrong password!" })
    }

    req.session.sid = user.id
    res.status(200).send({ msg: `Welcome ${user.name}`, user: user})
}

const logout = async (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        }
    })
    res.clearCookie(SESS_NAME)
    res.send({ msg: "You are logged out." })
}

module.exports = { 
    login,
    logout
}