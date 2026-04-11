const express = require("express");
const router = express.Router();

let authors = [];

// CREATE
router.post("/", (req, res) => {
    const author = req.body;
    authors.push(author);
    res.json(author);
});

// READ ALL
router.get("/", (req, res) => {
    res.json(authors);
});

// READ ONE
router.get("/:id", (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    res.json(author);
});

// UPDATE
router.put("/:id", (req, res) => {
    const index = authors.findIndex(a => a.id == req.params.id);
    authors[index] = req.body;
    res.json(authors[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
    authors = authors.filter(a => a.id != req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;