if (req.body.amount > user.balance) {
  return res.send("Insufficient balance");
}