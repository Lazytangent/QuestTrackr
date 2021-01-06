const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../authorization');// how will authorization work?

const router = express.Router();

router.get('/quest-create', asyncHandler, (req, res) => {
    res.render('quest-create',)
});