const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    groupname: String,
    groupprivacy: String,
    slogan: String,
    groupimage: String,
    creator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true});

module.exports = mongoose.model('Group', groupSchema);