const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QuestTrackr' });
});

router.get('/register', csrfProtection, asyncHandler(async (req, res) => {
  res.render('register', { title: 'Register', csrfToken: req.csrfToken() });
}));

module.exports = router;
