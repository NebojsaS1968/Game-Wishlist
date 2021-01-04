const User = require('../models/user')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
    const salt = 10
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const user = await User.findOne({ email: req.body.email })
        if(user){
            // User exists
            return res.status(200).send({ msg: "User already exists." })
        } else if(!user){
            // User doesn't exist
            const user = new User(newUser)
            user.password = await bcrypt.hash(req.body.password, salt)
            const save = await user.save()
            req.session.sid = user.id
            return res.status(201).send({ msg: "User saved.", user: save })
        }
    }

module.exports = { register }