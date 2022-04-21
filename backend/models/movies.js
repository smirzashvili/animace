const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    pathname: {
        type: String
    },
    rating: {
        type: Number,
    },
    score: {
        type: Number,
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String
    },
    photo: {
        type: String
    },
    subphoto: {
        type: String
    },
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    trailer: {
        type: String
    },
    year: {
        type: Number
    },
    status: {
        type: String
    },
    duration: {
        type: String
    },
    studio: {
        type: String
    },
    theatricalRelease: {
        type: String
    },
    streamingRelease: {
        type: String
    },
    story: {
        type: String
    },
    fullStory: {
        type: String
    },
    actors: [{
        actor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Actor',
        },
        role: {
            type: String
        }
    }],
    staff: [{
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
        },
        role: {
            type: String
        }
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
})

module.exports = mongoose.model('Movie', MovieSchema)