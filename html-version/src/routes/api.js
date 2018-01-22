// dependencies
const express = require('express');

// models
const Post = require('../models/post');
//const Comment = require('../models/comment');

const router = express.Router();

// api endpoints
router.get('/whoami', function(req, res) {
    res.send({
         _id: 'anonid',
        name: 'Anonymous',
        last_post: 'Anon was here'
    });
});

router.get('/user', function(req, res) {
    res.send({
         _id: 'anonid',
        name: 'Anonymous',
        last_post: 'Anon was here'
    });
});

router.get('/posts', function(req, res) {
    Post.find({}, function(err, posts){
        res.send(posts);
    });
});

router.post('/posts', function(req,res) {
    const newPost = new Post({
        'creator_id': 'anonid',
        'creator_name': 'anonymous',
        'content': req.body.content
    });
    newPost.save(function(err,post) {
        if (err) console.log(err);
    });
    res.send({});
});

/*

router.get('/comment', function(req, res) {
    // CODE TGT: Fetch the comments that have the parent given in the "parent" parameter
    // Question: Do we get parent with req.body.parent or req.query.parent?
    Comment.find({ parent: req.query.parent }, function(err, comments) {
        res.send(comments);
    });
});

router.post('/comment', function(req, res) {
    // CODE: populate the parent and content keys below
    const newComment = new Comment({
        'creator_id':'anonid',
        'creator_name':'Anonymous',
        'parent': req.body.parent, 
        'content': req.body.content 
    });

    // CODE: save the comment
    newComment.save(function(err, comment) {
        if (err) console.log(err);
    });
    
    res.send({});
});*/

module.exports = router;