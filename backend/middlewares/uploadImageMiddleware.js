const fs = require('fs');
const cloudinary = require('cloudinary')




const uploadImage = async function(req, res, next) {
    try {

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET	
        })
        
        if(!req.files || Object.keys(req.files).length === 0)
            return next()
            
        const file = req.files.file;
        
        if(!file.mimetype.includes("image")){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large."})
        } 

        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'animace/userPhoto',

        }, async(err, result) => {
            if(err) throw err;

        removeTmp(file.tempFilePath)

        req.files.file.name = result.url        
        next()
    })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

module.exports = uploadImage