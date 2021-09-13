const router = require('express').Router()
const cloudinary = require('cloudinary')
const fs = require('fs')

// 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', (req, res) => {
    try {
        console.log(req.files)
        if(!req.file || Object.keys(req.files).length === 0) {
            return res.status(400).json({msg: "No files were uploaded"})
        }

        const file = req.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tmpFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTmp(file.tmpFilePath)
            return res.status(400).json({msg: "Upload PNG or JPEG file"})
        }
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result) => {
            if(err) throw err;
            removeTmp(file.tmpFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })
        res.json("test upload")
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
})

router.post('/destroy', (req, res) => {
     try {
         const {public_id} = req.body;
         if(!public_id) {
             return res.status(500).json({msg: "No images to delete "})

            }
        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;

            res.json({msg: "Deleted image"})
        }) 
     } catch(err) {
         return res.status(500).json({msg: err.message})
     }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router