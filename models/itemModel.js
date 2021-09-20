const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    item_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    sellerID: {
        type: String
    },
    checkoutid: {
        type: String
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subcategory:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Items", itemSchema)