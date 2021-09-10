const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try{
            const {name, email, password} = req.body;

            const user =  await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})
        
            if(password.length < 6)
                return res.status(400).json({msg: "Password is a least 6 characters long."})
        //  hashing the password
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save in MongoDB
            await newUser.save()

            // Then create a jsonwebtoken for authentication
            req.session.user = newUser

            res.json({msg: "Registered Successfully!"})

            } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = userCtrl