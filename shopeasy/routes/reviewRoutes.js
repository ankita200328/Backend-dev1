const express = require("express");
const router = express.Router();
const validator = require("validator");

router.post("/", (req, res) => {
  const cleanReview = validator.escape(req.body.review);
  res.send(cleanReview);
});

module.exports = router;