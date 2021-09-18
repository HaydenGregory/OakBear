const Items = require('../models/itemModel')
const Users = require('../models/userModel');


//filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)

        //gte = greater than or equal
        //lte = lesser than or equal
        //gt = greater than
        //lt = less than 
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this
    }

}

const itemCtrl = {
    getItems: async (req, res) => {
        try {
            const features = new APIfeatures(Items.find(), req.query)
            .filtering().sorting().paginating()
            const items = await features.query

            res.json({
                status: "sucess",
                result: items.length,
                items: items
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    getItem: async(req, res) => {
        const item = await Items.findOne({item_id: req.params.id})
        if (!item) return res.status(404).json({ error: "Item not found" })
        
        res.json({item})
    },
    createItem: async (req, res) => {
        try {
            const {item_id, seller, sellerID, title, price, description, content, images, category, subcategory, condition, size, color, brand} = req.body
            console.log(req.body)
            if (!images) {
                return res.status(400).json({ msg: "No image uploaded" })
            }

            const item = await Items.findOne({ item_id })
            if (item) {
                return res.status(400).json({ msg: "This product already exists" })
            }
            const newItem = new Items({
                item_id, seller, sellerID, title: title.toLowerCase(), price, description, content, images, category, subcategory, condition, size, color, brand
            })
            await newItem.save()
            res.json({ msg: "Created an item", item: newItem })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteItem: async (req, res) => {
        try {
            await Items.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateItem: async (req, res) => {
        try {
            const {title, price, description, content, images, category, subcategory, condition, size, color, brand} = req.body; 
            if(!images) {
                return res.status(400).json({msg: "No image uploaded"})
            }
            await Items.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category, subcategory, condition, size, color, brand
            })
            res.json({ msg: "Updated an item" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = itemCtrl