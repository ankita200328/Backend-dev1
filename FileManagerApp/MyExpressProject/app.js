


// const responseTime = require("./middleware/responseTime");
console.log("Middleware loaded successfully");

const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const responseTime = require("./middleware/responseTime");

app.use(responseTime);          // Use middleware
app.use("/users", userRoutes);  // Use route

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
