const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
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
    }]},
    { timestamps: true }
)

module.exports = mongoose.model('Article', ArticleSchema)