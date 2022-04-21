const mongoose = require('mongoose')

const ActorSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    photo: {
        type: String,
    },
    bio: {
        type: String,
    }
})

module.exports = mongoose.model('Actor', ActorSchema)