const validator = require("validator");

module.exports = (req, res, next) => {
  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.send("Invalid email");
  }
  next();
};