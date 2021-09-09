const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        type: Array,
        required: false,
    },
    cart: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ""
    }, 
    gender: {
        type: Boolean,
        default: true
    }, 
    picture: {
        type: 
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)