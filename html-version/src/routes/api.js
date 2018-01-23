// dependencies
const express = require('express');
const connect = require('connect-ensure-login')

// models
const Post = require('../models/post');
//const GalleryImage = require('../models/galleryimage.js');
//const Comment = require('../models/comment');

const router = express.Router();

// api endpoints
router.get('/whoami', function(req, res) {
    if (req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});

router.get('/user', function(req, res) {
    User.findOne({_id: req.query._id}, function(err, user) {
        res.send(user);
    })
});

router.get('/posts', function(req, res) {
    Post.find({}, function(err, posts){
        res.send(posts);
    });
});

router.post('/posts', connect.ensureLoggedIn(), function(req,res) {
    User.findOne({_id: req.user._id}, function(err, user){
        const newPost = new Post({
            'creator_id': user._id,
            'creator_name': user.name,
            'content': req.body.content
        });
        user.save();
        
    newPost.save(function(err,post) {
        if (err) console.log(err);
    });
    res.send({});
});
}
);

/*router.get('/images', function(req, res) {
    GalleryImage.find({}, function(err, images){
        res.send(images);
    });
});

router.post('/images', function(req,res) {
    const newGalleryImage = new GalleryImage({
        'creator_id': 'anonid',
        'creator_name': 'anonymous',
        'image_url': req.body.content
    });
    newGalleryImage.save(function(err,images) {
        if (err) console.log(err);
    });
    res.send({});
});*/



module.exports = router;