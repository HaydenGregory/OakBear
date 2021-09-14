const Items = require('../models/itemModel')

//filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryStrnig;
    }
    filtering() {
        const queryObt = {...this.queryString} //queryString = req.query
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        return this
    }
    sorting(){}
    paginating(){}

}

const itemCtrl = {
    getItem: async(req, res) => {
        try {
            const items = await Items.find()

            res.json(items)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createItem: async(req,res) => {
        try {
            const {item_id, title, price, description, content, images, category, condition, size, color, brand} = req.body
            console.log(req.body)
            console.log(req.body.images)
            if(!images) {
                return res.status(400).json({msg: "No image uploaded"})
            }

            const item = await Items.findOne({item_id})
            if(item) {
                return res.status(400).json({msg: "This product already exists"})
            }
            const newItem = new Items({
                item_id, title: title.toLowerCase(), price, description, content, images, category, condition, size, color, brand
            })
            await newItem.save()
            res.json({msg: "Created an item"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteItem: async(req,res) => {
        try {
          await Items.findByIdAndDelete(req.params.id)
          res.json({msg: "Deleted a Product"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateItem: async(req,res) => {
        try {
            const {title, price, description, content, images, category, condition, size, color, brand} = req.body; 
            if(!images) {
                return res.status(400).json({msg: "No image uploaded"})
            }
            await Items.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category, condition, size, color, brand
            })
            res.json({msg: "Updated an item"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = itemCtrl