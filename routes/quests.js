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

const questValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your quest, quest-taker')
        .isLength({ max: 100, min: 1 })
        .withMessage('Name must not be more than 100 characters long and at least 1 character, quest-taker'),
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a date and time to start your quest, quest-taker')
        .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
        .withMessage('The provided date and time do not match the required format'),
    check('deadline')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a date and time as your deadline for the quest, quest-taker')
        .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
            .withMessage('The provided date and time do not match the required format'),
    check('completedDate')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a date and time to complete your quest, quest-taker')
        .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
        .withMessage('The provided date and time do not match the required format'),
    check('xpValue')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an XP Value for your quest, quest-taker'),
        
    check('description')
        .if(body('description').exists())
        .isLength({ max: 1000})
        .withMessage('Description must not be more than 1000 characters long'),
];

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

module.exports = router;