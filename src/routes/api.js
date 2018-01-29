// dependencies
const express = require('express');
const connect = require('connect-ensure-login')

// models
const Post = require('../models/post');
const User = require('../models/user');
const Inked = require('../models/inked');
const ProfilePicture = require('../models/profilepicture');


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
            if (err) console.log(err);
        });
        res.send({});
    });
});

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

router.post('/profilepicture', connect.ensureLoggedIn(), function (req, res) {
    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        const newProfilePicture = new ProfilePicture({
            'image_url': req.body.image_url
        });
        user.set({
            profile_picture: req.body.image_url
        });
        user.save();

        newProfilePicture.save(function (err, post) {
            const io = req.app.get('socketio');
            io.emit("updateProPic", {
                image_url: req.body.image_url
            });
            if (err) console.log(err);
        });
        res.send({});
    });
});

router.get('/post/:id/remove', connect.ensureLoggedIn(), function (req, res) {
    Post.findByIdAndRemove({
            _id: req.params.id
        },
        function (err, docs) {
            if (err) console.log(err);
            else console.log('delete success');
        });
    const io = req.app.get('socketio');
    io.emit("deletePost", {
        post_id: req.params.id
    });
});

router.get('/ink/:id/remove', connect.ensureLoggedIn(), function (req, res) {
    Inked.findByIdAndRemove({
            _id: req.params.id
        },
        function (err, docs) {
            if (err) console.log(err);
            else console.log('delete success');
        });
    const io = req.app.get('socketio');
    io.emit("deleteInk", {
        inked_id: req.params.id
    });
});


module.exports = router;
