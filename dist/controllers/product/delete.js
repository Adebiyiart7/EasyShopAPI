"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const deleteProduct = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.id);
    yield product_1.default.findOneAndDelete({ _id: req.query.id });
    return res
        .status(200)
        .json((0, utils_1.apiResponse)(res.statusCode, "Your item was successfully deleted!", true));
}));
exports.default = deleteProduct;
//# sourceMappingURL=delete.js.map