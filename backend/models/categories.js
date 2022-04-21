const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    photo: {
        type: String,
    }
})

module.exports = mongoose.model('Category', CategorySchema)