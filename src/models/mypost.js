const mongoose = require('mongoose');

const MyPostModelSchema = new mongoose.Schema({
    user_id: String,
    post_id: String
});

module.exports = mongoose.model('MyPostModel', MyPostModelSchema);
