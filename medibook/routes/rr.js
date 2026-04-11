if (record.userId !== req.session.userId) {
  return res.send("Forbidden");
}