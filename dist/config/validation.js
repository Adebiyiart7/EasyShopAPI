"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// PRODUCT
exports.productSchema = joi_1.default.object({
    userId: joi_1.default.string().required().label("User ID"),
    name: joi_1.default.string().required().min(3).max(255).label("Product Name"),
    price: joi_1.default.string().required().label("Price"),
});
//# sourceMappingURL=validation.js.map