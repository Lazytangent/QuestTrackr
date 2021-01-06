const csrf = require('csurf');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

module.exports = {
  csrfProtection,
  asyncHandler,
  bcrypt,
  validationResult,
  check
};
