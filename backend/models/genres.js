const mongoose = require('mongoose')

const GenreSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    photo: {
        type: String,
    }
})

module.exports = mongoose.model('Genre', GenreSchema)