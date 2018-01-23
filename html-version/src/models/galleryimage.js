const mongoose = require('mongoose');

const GalleryImageModelSchema = new mongoose.Schema({
    creator_id      :String,
    creator_name    :String,
    image_url       :String,
    post_id         :String
});

module.exports = mongoose.model('GalleryImageModel', GalleryImageModelSchema);