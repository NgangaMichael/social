const mongoose = require('mongoose');
const repostSchema = mongoose.Schema({
    post: String,
    postimage: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repost'
    }]
}, {timestamps: true});
module.exports = mongoose.model('Post', repostSchema);