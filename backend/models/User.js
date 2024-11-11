const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Basic email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 5, // Minimum length for password
        // You can add more validation logic here (like regex for complexity)
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('User', UserSchema); // Use singular model name
