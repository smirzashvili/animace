const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    interests: {
        type: String,
    },
    photo: {
        type: String,
    }},
    { timestamps: true }
)

module.exports = mongoose.model('Author', AuthorSchema)