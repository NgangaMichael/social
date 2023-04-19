const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    country: String,
    password: String,
    
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);