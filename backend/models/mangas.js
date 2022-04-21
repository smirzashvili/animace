const mongoose = require('mongoose')

const MangaSchema = new mongoose.Schema({
    pathname: {
        type: String
    },
    rating: {
        type: Number,
    },
    title: {
        type: String,
    },
    photo: {
        type: String
    },
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    alternativeName: {
        type: String
    },
    author: {
        type: String
    },
    publisher: {
        type: String
    },
    year: {
        type: Number
    },
    status: {
        type: String
    },
    views: {
        type: Number
    },
    volumes: {
        type: Number
    },
    releaseDate: {
        type: String
    },
    finishDate: {
        type: String
    },
    fullstory: {
        type: String
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
})

module.exports = mongoose.model('Manga', MangaSchema)