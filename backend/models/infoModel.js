const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false,

    },
    address: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },

    profileImage: {
        type: String, // Base64-encoded image will be stored as a string
        required: false // Optional field
    }
});

module.exports = mongoose.model('Info', infoSchema);
