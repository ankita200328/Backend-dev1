router.post("/", sanitize, async (req, res) => {
  const post = new Post({ content: req.body.content });
  await post.save();
  res.send(post);
});