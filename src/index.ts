import "colors";
import "dotenv";
import "express-async-errors";
import express from "express";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import { createServer } from "http";
import cors from "cors";

import connectDatabase from "./config/db";
import errorMiddleware from "./middleware/error";
import productsRouter from "./routes/product";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDatabase();

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

app.use("/api/v1/products", productsRouter);

app.use(errorMiddleware);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
