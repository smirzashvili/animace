const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    photo: {
        type: String
    },
    subtitle: {
        type: String
    },
    text: {
        type: String
    },
    subphoto: {
        type: String
    },
    video: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    pathname: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    score: {
        type: Number,
    },
    about: {
        type: String,
    }},
    { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)