const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    firstname:
    {
        type: String, 
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    phone:
    {
        type: String,
        required: true,
        unique: true, 
    },
    paid:
    {
        type: Boolean,
        required: true,
        default: false,
    }
    
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);