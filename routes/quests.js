const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../authorization');// how will authorization work?

const router = express.Router();

router.get('/quest-create', csrfProtection, (req, res) => {
    const quest = db.Quest.build();
    res.render('quest-create', {
        title: 'Create a Quest',
        quest,
        csrfToken: req.csrfToken(),
    });
});

// TODO taken from register post route, need to clean up...
// router.post('/quest-create', csrfProtection, userValidators,
//     asyncHandler(async (req, res, next) => {
//         const {
//             username,
//             password,
//             email 
//         } = req.body;
//         const user = db.User.build({
//             username,
//             email 
//         });
//         const validatorErrors = validationResult(req);

//         if (validatorErrors.isEmpty()) {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             user.hashedPassword = hashedPassword;
//             await user.save();
//             loginUser(req, res, user, next,);
//         } else {
//             const errors = validatorErrors.array().map((error) => error.msg);
//             console.log(errors)
//             res.render('register', {
//                 title: 'Register',
//                 user,
//                 errors,
//                 csrfToken: req.csrfToken(),
//             });
//         }
//     }));