const express = require('express');
const { check, validationResult } = require('express-validator');
const { Quest, User, UserQuest } = require('../db/models');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/new', csrfProtection, (req, res) => {
    const quest = db.Quest.build();
    res.render('quest-create', {
        title: 'Create a Quest',
        quest,
        csrfToken: req.csrfToken(),
    });
});

router.get('/edit/:id', csrfProtection, asyncHandler( async(req, res) => {
    let checkbox;
    const questId = parseInt(req.params.id, 10);
    const quest = await Quest.findByPk(questId);
    if(quest.solo === true){
        checkbox = 'checked'
    }
    const beginDate = quest.startDate.toISOString();
    const slicedDate = beginDate.slice(0, beginDate.length - 1);
    const deadDate = quest.deadline.toISOString();
    const slicedEndDate = deadDate.slice(0, deadDate.length - 1);

    res.render('quest-edit', {
        title: 'Reassess Your Quest',
        quest,
        slicedDate,
        slicedEndDate,
        checkbox,
        csrfToken: req.csrfToken(),
    });
}));

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
            console.log(errors)
            res.render('quest-create', {
                title: 'Create a Quest',
                quest,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));

router.post('/edit/:id', csrfProtection, questValidators,
    asyncHandler(async (req, res, next) => {
        const questId = parseInt(req.params.id, 10)
        let {
            name,
            startDate,
            deadline,
            xpValue,
            solo,
            description
        } = req.body;
        let { id } = res.locals.user;
        if (solo == undefined) {
            solo = false;
        };
        const quest = await Quest.findByPk(questId);
        quest.name = name
        quest.startDate = startDate;
        quest.deadline = deadline;
        quest.xpValue = xpValue;
        quest.solo = solo;
        quest.description = description;
        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await quest.save();
            await UserQuest.create({ userId: id, questId: quest.id })
            res.redirect('/');
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            console.log(errors)
            res.render('quest-edit', {
                title: 'Reassess Your Quest',
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
