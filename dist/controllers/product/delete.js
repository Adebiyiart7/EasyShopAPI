"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const async_1 = __importDefault(require("../../middleware/async"));
const product_1 = __importDefault(require("../../models/product"));
/**
 * @route         POST /products/delete
 * @description   delete product
 * @access        private
 */
const deleteProduct = (0, async_1.default)(async (req, res) => {
    console.log(req.query.id);
    await product_1.default.findOneAndDelete({ _id: req.query.id });
    return res
        .status(200)
        .json((0, utils_1.apiResponse)(res.statusCode, "Your item was successfully deleted!", true));
});
exports.default = deleteProduct;
