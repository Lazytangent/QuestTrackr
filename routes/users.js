const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser } = require('../authorization');

const router = express.Router();

router.get('/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });
});

const userValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name, quest-taker')
    .isLength({ max: 20 })
    .withMessage('First Name must not be more than 20 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password, quest-taker')
    .isLength({ max: 20 })
    .withMessage('Password must not be more than 20 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter and a number, quest-taker'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password, quest-taker')
    .isLength({ max: 20 })
    .withMessage('Confirm Password must not be more than 20 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password, quest-taker');
      }
      return true;
    }),
];

router.post('/register', csrfProtection, userValidators,
  asyncHandler(async (req, res) => {
    const {
      userName,
      password,
    } = req.body;

    const user = db.User.build({
      userName
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
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
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for a username, quest-taker'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password, quest-taker'),
];

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      userName,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      // Attempt to get the user by their user name!
      const user = await db.User.findOne({ where: { userName } });

      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password(quest taker)!
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

        if (passwordMatch) {
          // If the password hashes match, then login the user name!
          // and redirect them to the home route.
          loginUser(req, res, user);
          return res.redirect('/');
        }
      }

      // Otherwise display an error message to the user.
      errors.push('Login failed for the provided user name and password, quest taker');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('login', {
      title: 'Login',
      userName,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));



module.exports = router;