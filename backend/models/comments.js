const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    text: {
        type: String
    },
    index: {
        type: Number
    },
    replies: [
        
    ],
    repliedTo: {
        type: String
    }},
{timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema)