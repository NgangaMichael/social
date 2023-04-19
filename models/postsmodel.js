const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    post: String,
    postimage: String,
}, {timestamps: true});
module.exports = mongoose.model('Post', postSchema);