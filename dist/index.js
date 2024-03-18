"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
require("dotenv");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const error_1 = __importDefault(require("./middleware/error"));
const product_1 = __importDefault(require("./routes/product"));
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, db_1.default)();
// Initialize HTTP server
const server = (0, http_1.createServer)(app);
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["*"],
}));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, compression_1.default)());
app.use("/api/v1/media", express_1.default.static("media"));
app.use("/api/v1/products", product_1.default);
app.use(error_1.default);
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map