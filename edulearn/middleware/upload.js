if (!file.mimetype.includes("pdf")) {
  return res.send("Invalid file");
}