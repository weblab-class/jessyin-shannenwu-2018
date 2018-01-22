const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('about.html', { root: 'src/views' });
});

router.get('/u/profile', function(req, res) {
  res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/posts', function(req, res) {
  res.sendFile('posts.html', { root: 'src/views' });
});

router.get('/about', function(req, res) {
  res.sendFile('about.html', { root: 'src/views' });
});

module.exports = router;