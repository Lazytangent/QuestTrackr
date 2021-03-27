const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { Category } = require("../db/models");

router.get('', asyncHandler(async (_, res) => {
  const categories = Category.findAll();
  return res.json({ categories });
}));

module.exports = router;
