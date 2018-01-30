const mongoose = require('mongoose');

const UserLikesModelSchema = new mongoose.Schema({
    user_id: String,
    post_id: String,
});

module.exports = mongoose.model('UserLikesModel', UserLikesModelSchema);
