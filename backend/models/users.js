const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide a surname'],
    },
    username: {
        type: String,
        required: [true, 'Please provide an username'],
        unique: [true, 'User exists with this username']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'User exists with this email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
    },
    file: {
        type: String,
    }},
    { timestamps: true }
)

UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema)