const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt, validationResult, check } = require('./utils/utils');

const { User } = require('../db/models/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'QuestTrackr' });
});

//Get Registration page
router.get('/register', csrfProtection, asyncHandler(async (req, res) => {
  res.render('register', { title: 'Register', csrfToken: req.csrfToken() });
}));

//Authentication

//-Validators
const registrationValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 30 })
    .withMessage('Your username must be between 3 and 30 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('You must input a password.'),
  check('confirmedPassword')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Your password and password confirmation must match.'),
]

router.post('/register', csrfProtection, registrationValidators, asyncHandler(async (req, res, next) => {
  const { username, password, email } = req.body;
  const validatorErrors = validationResult(req);
  const user = await User.build( { username, email });
  if (validatorErrors.isEmpty()) {
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create the user
    user.hashedPassword = hashedPassword;
    await user.save();
    req.session.user = { username: user.username, id: user.id };

    req.session.save(err => {
      if (err) {
        next(err);
      }
      res.redirect('/');
    });
  } else {
    const errors = validatorErrors.array().map(err => err.msg);
    res.render('register', { title: 'Register', csrfToken: req.csrfToken(), errors, user})
  }
}));

module.exports = router;
