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
    check('xpValue')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an XP Value for your quest, quest-taker')
        .isNumeric()
        .withMessage('Please provide only numbers for the XP Value, quest-taker'),
    check('description')
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