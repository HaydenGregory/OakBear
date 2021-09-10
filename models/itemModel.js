const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    brand: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Items', itemSchema)