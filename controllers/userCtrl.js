const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })
            if (password.length < 6)
                return res.status(400).json({ msg: "Password is a least 6 characters long." })
            //  hashing the password
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })
            // Save in MongoDB
            await newUser.save()
            req.session.user = newUser
            res.json({ msg: "Registered Successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // find the user
            const user = await Users.findOne({ email })
            // if no user send error
            if (!user) return res.status(403).json({ msg: "Incorrect Email." })
            // compare the passwords
            bcrypt.compare(password, user.password).then((success) => {
                if (success) {
                    // give user cookie
                    req.session.user = user;
                    // send success message
                    res.status(200).json({ msg: 'Successfully Logged In.' })
                } else {
                    // if incorrect, 401 (unauthorized)
                    res.status(401).json({ msg: "Incorrect Password." })
                    // redirect to user dashboard || homepage
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    logout: async (req, res) => {
        try {
            req.session.user = null
            res.status(200).json({ msg: 'Successfully Logged Out.' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    delete: async (req, res) => {
        // delete user with that email but confirm password first
        try {
            const { email, password } = req.body;
            // find the user
            const user = await Users.findOne({ email })
            // if no user send error
            if (!user) return res.status(403).json({ msg: "Incorrect Email." })
            // compare the passwords
            const success = await bcrypt.compare(password, user.password)
            if (success) {
                await Users.deleteOne(user)
                res.status(200).json({ msg: "User Deleted." })
            } else {
                // if incorrect, 401 (unauthorized)
                res.status(401).json({ msg: "Incorrect Password." })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = userCtrl