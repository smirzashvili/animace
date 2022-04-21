const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model('Tag', TagSchema)