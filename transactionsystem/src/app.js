import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import healthRoutes from "./routes/health.route.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api", healthRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});