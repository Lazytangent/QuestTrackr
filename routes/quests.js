const express = require('express');
const { check, validationResult } = require('express-validator');
const { Quest, User, Category } = require('../db/models');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

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
    // check('startDate')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a date and time to start your quest, quest-taker')
    //     .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/')
    //     .withMessage('The provided date and time do not match the required format, quest-taker'),
    // check('deadline')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a date and time as your deadline for the quest, quest-taker')
    //     .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/')
    //     .withMessage('The provided date and time do not match the required format, quest-taker')
    //     // [
        // customSanitizer('deadline').toDate(),
        // check('startDate').toDate().custom((startDate, { req }) => {
        //     if (startDate.getTime() >= req.body.deadline.getTime()) {
        //         throw new Error('Deadline must be after start date, quest-taker');
        //     }
        // })
        // ],
        
    check('xpValue')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an XP Value for your quest, quest-taker')
        .isNumeric()
        .withMessage('Please provide only numbers for the XP Value, quest-taker'),
    check('description')
        // .if(req.body('description').exists())
        .isLength({ max: 1000})
        .withMessage('Description must not be more than 1000 characters long, quest-taker')
];

router.post('/quest-create', csrfProtection, questValidators,
    asyncHandler(async (req, res, next) => {
        const {
            name,
            startDate,
            deadline,
            xpValue,
            solo,
            description 
        } = req.body;
        const quest = db.Quest.build({
            name,
            startDate,
            deadline,
            xpValue,
            solo,
            description 
        });
        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await quest.save();
            res.redirect('/')
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            console.log(errors)
            res.render('quest-create', {
                title: 'Create a Quest',
                quest,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const questId = parseInt(req.params.id, 10);
    const quests = await Quest.findByPk(questId, { include: User })
    res.render('quest-detail', { title: `Quest #${questId}`, quests });
}));


module.exports = router;