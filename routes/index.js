const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../authorization');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: "QuestTrackr" })
})

router.get('/main', (req, res) => {
  res.render('main', {
    title: 'main',
  });
});

router.get('/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });
});

const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 30, min: 2 })
    .withMessage('First Name must not be more than 20 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter and a number'),
  check('confirmedPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Your password confirmation does not match the entered password')
];

router.post('/register', csrfProtection, userValidators,
  asyncHandler(async (req, res, next) => {
    const {
      username,
      password,
      email //this is in database schema
    } = req.body;
    const user = db.User.build({
      username,
      email //this is in database schema
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user, next, 'register');
      // res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('register', {
        title: 'Register',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

router.get('/login', csrfProtection, (req, res) => {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res, next) => {
    const {
      username,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      // Attempt to get the user by their user name!
      const user = await db.User.findOne({ where: { username } });

      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password(quest taker)!
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

        if (passwordMatch) {
          // If the password hashes match, then login the user name!
          // and redirect them to the home route.
          loginUser(req, res, user, next);
          return;
        }
      }
      errors.push('Login failed for the provided Username and Password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('login', {
      title: 'Login',
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/login-demo', csrfProtection,
  asyncHandler(async (req, res, next) => {
    const username = 'Demo';
    const password = 'Password11235';

    const user = await db.User.findOne({ where: { username } });

    loginUser(req, res, user, next);
  }));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
});



module.exports = router;
