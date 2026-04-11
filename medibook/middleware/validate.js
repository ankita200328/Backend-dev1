if (isNaN(Date.parse(req.body.date))) {
  return res.send("Invalid date");
}