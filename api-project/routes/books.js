let books = [
    { id: 1, title: "Book A", author: "John", year: 2020 },
    { id: 2, title: "Book B", author: "Jane", year: 2021 },
    { id: 3, title: "Book C", author: "John", year: 2022 }
];


const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let { author, year } = req.query;

    let filteredBooks = books;

    if (author) {
        filteredBooks = filteredBooks.filter(b => b.author === author);
    }

    if (year) {
        filteredBooks = filteredBooks.filter(b => b.year == year);
    }

    res.json(filteredBooks);
});

module.exports = router;


const validateYear = require("../middleware/validateYear");

router.post("/", validateYear, (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});




router.get("/", (req, res) => {
    let { page = 1, limit = 2 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        data: paginatedBooks
    });
});



router.get("/search", (req, res) => {
    const { title } = req.query;

    const result = books.filter(b =>
        b.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(result);
});