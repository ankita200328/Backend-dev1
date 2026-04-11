if (req.body.answer !== correctAnswer) {
  return res.send("Invalid attempt");
}