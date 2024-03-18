require("colors");
require("dotenv").config();
require("express-async-errors");
const express = require("express");
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import { createServer } from "http";
import cors from "cors";

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/error");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize HTTP server
const server = createServer(app);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["*"],
  })
);
app.use(mongoSanitize());
app.use(compression());
app.use("/api/v1/media", express.static("media"));

app.use("/api/v1/products", require("./routes/product"));

app.use(errorMiddleware);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
