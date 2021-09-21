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
        unique: true
    },
    account: {
        type: Object
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        type: Array
    },
    cart: {
        type: Array,
        default: []
    },
    sold: {
        type: Array,
        default: []
    },
    purchased: {
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
        type: String,
        default: ""
    }, 
    picture: {
        type: Object,
        default: {}
    },
    dob: {
        type: Date,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)