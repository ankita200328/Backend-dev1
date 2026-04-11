const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const sanitize = require("mongo-sanitize");

router.get("/search", async (req, res) => {
  const search = sanitize(req.query.name);

  const products = await Product.find({
    name: { $regex: search, $options: "i" }
  });

  res.json(products);
});

module.exports = router;