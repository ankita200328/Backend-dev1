const sanitizeHtml = require("sanitize-html");

const clean = sanitizeHtml(req.body.description);