const mongoose = require('mongoose');

const ProfilePictureModelSchema = new mongoose.Schema({
    image_url: String
});

module.exports = mongoose.model('ProfilePictureModel', ProfilePictureModelSchema);
