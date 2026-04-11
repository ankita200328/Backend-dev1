const mongoSanitize = require("mongo-sanitize");
const validator = require("validator");

module.exports = function (req, res, next) {
  if (req.body) {
    for (let key in req.body) {
      req.body[key] = validator.escape(req.body[key]);
    }
  }
  next();
};