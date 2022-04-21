const mongoose = require('mongoose')

const SerieSchema = new mongoose.Schema({
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
    episodes: {
        type: String
    },
    duration: {
        type: String
    },
    studio: {
        type: String
    },
    releaseFormat: {
        type: String
    },
    broadcast: {
        type: String
    },
    airedInit: {
        type: String
    },
    airedFinish: {
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
    }]
})

module.exports = mongoose.model('Serie', SerieSchema)