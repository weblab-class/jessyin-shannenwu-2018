const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    name: String,
    fbid: String,
    profile_picture: String
});

module.exports = mongoose.model('UserModel', UserModelSchema);
