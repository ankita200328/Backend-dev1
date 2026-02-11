const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Ankita" },
  { id: 2, name: "Rohan" },
  { id: 3, name: "Aman" }
];

router.get("/", (req, res) => {
  const { name } = req.query;

  let filtered = users;

  if (name) {
    filtered = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(filtered);
});

module.exports = router;
