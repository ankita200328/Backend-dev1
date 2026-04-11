const express = require("express");
const app = express();
const connectDB = require("./config/db");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(xss());

// Helmet
app.use(helmet());

// Session
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/shopeasy"
  }),
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});
app.use("/login", limiter);

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));

// Admin test
const admin = require("./middleware/admin");

app.get("/admin", admin, (req, res) => {
  res.send("Admin Panel");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});