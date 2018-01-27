const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function (req, res, next) {
    res.sendFile('about.html', {
        root: 'src/views'
    });
});

router.get('/u/profile', function (req, res) {
    res.sendFile('profile.html', {
        root: 'src/views'
    });
});

router.get('/p/idea', function (req, res) {
    res.sendFile('idea.html', {
        root: 'src/views'
    });
});

router.get('/posts', function (req, res) {
    res.sendFile('posts.html', {
        root: 'src/views'
    });
});

router.get('/about', function (req, res) {
    res.sendFile('about.html', {
        root: 'src/views'
    });
});

router.get('/gallery', function (req, res) {
    res.sendFile('gallery.html', {
        root: 'src/views'
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;
