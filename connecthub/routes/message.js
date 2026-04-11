router.get("/:id", auth, async (req, res) => {
  const msg = await Message.findById(req.params.id);

  if (msg.receiverId.toString() !== req.session.userId) {
    return res.send("Unauthorized");
  }

  res.send(msg);
});