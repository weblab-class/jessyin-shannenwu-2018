// dependencies
const express = require('express');
const connect = require('connect-ensure-login')

// models
const Post = require('../models/post');
const User = require('../models/user');
const MyPost = require('../models/mypost');
const Inked = require('../models/inked');


const router = express.Router();

// api endpoints
router.get('/whoami', function (req, res) {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send({});
    }
});

router.get('/user', function (req, res) {
    User.findOne({
        _id: req.query._id
    }, function (err, user) {
        res.send(user);
    });
});

router.get('/posts', function (req, res) {
    Post.find({}, function (err, posts) {
        res.send(posts);
    });
});


router.post('/posts', connect.ensureLoggedIn(), function (req, res) {
    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        const newPost = new Post({
            'creator_id': user._id,
            'creator_name': user.name,
            'content': req.body.content
        });
        user.save();

        newPost.save(function (err, post) {
            const io = req.app.get('socketio');
            io.emit('post', {
                _id: post._id,
                creator_id: user._id,
                creator_name: user.name,
                content: req.body.content
            });
            //
            const newMyPost = new MyPost({
                'user_id': user._id,
                'post_id': post._id
            });

            newMyPost.save(function (err, post) {
                if (err) console.log(err);
            });

            //
            if (err) console.log(err);
        });
        res.send({});
    });
});

/*
router.get('/mypost', function (req, res) {
    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        MyPost.find({
            user_id: user._id
        }, function (err, posts) {
            res.send(posts);
        });
    });
});

router.post('/mypost', connect.ensureLoggedIn(), function (req, res) {
    const newMyPost = new MyPost({
        'user_id': req.user._id,
        'post_id': req.body.post_id
    });
    user.save();

    newMyPost.save(function (err, post) {
        if (err) console.log(err);
    });
    res.send({});
});*/

router.get('/inked', function (req, res) {
    Inked.find({}, function (err, posts) {
        res.send(posts);
    });
});

router.post('/inked', connect.ensureLoggedIn(), function (req, res) {
    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        const newInked = new Inked({
            'creator_id': user._id,
            'creator_name': user.name,
            'image_url': req.body.image_url,
            'post_id': req.body.post_id
        });
        user.save();

        newInked.save(function (err, post) {
            if (err) console.log(err);
        });
        res.send({});
    });
});




module.exports = router;
