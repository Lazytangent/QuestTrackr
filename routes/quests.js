const express = require('express');
const { check, validationResult } = require('express-validator');
const { Quest, User, UserQuest, Category } = require('../db/models');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  // const quests = await Quest.findAll({ include: Category });
  const categories = await Category.findAll();
  res.render('quests', { title: 'Quests Home Page', categories });
}));

router.get('/new', csrfProtection, (req, res) => {
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

router.post('/', csrfProtection, questValidators,
    asyncHandler(async (req, res, next) => {
        let {
            name,
            startDate,
            deadline,
            xpValue,
            solo,
            description
        } = req.body;
        let { id } = res.locals.user;
        if(solo == undefined){
            solo = false;
        };

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
            await UserQuest.create({ userId: id, questId: quest.id })
            res.redirect('/');
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
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
  const quest = await Quest.findByPk(questId, { include: User })
  res.render('quest-detail', { title: `Quest #${questId}`, quest });
}));


module.exports = router;
