"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const async_1 = __importDefault(require("../../middleware/async"));
const product_1 = __importDefault(require("../../models/product"));
/**
 * @route         GET   /products/
 * @description   Fetches products by user id
 * @access        public
 */
exports.default = (0, async_1.default)(async (req, res) => {
    const products = await product_1.default.find({ userId: req.query.userId }).sort({
        updatedAt: -1,
    });
    res.status(200).json((0, utils_1.apiResponse)(res.statusCode, "", products));
});
