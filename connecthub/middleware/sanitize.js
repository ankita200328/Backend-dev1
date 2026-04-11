const sanitizeHtml = require("sanitize-html");

module.exports = (req, res, next) => {
  if (req.body.content) {
    req.body.content = sanitizeHtml(req.body.content, {
      allowedTags: ["b", "i", "a"]
    });
  }
  next();
};