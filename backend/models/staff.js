const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    photo: {
        type: String,
    },
    bio: {
        type: String,
    },
})

module.exports = mongoose.model('Staff', StaffSchema)