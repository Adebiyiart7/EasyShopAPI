"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const validation_1 = require("../../config/validation");
const utils_1 = require("../../utils");
const async_1 = __importDefault(require("../../middleware/async"));
const product_1 = __importDefault(require("../../models/product"));
/**
 * @route         POST /products/add
 * @description   Add new product
 * @access        private
 */
const add = (0, async_1.default)(async (req, res) => {
    // Validate product
    const file = req.file;
    if (!file) {
        res.status(404);
        throw new Error("Image not provided");
    }
    const { error } = validation_1.productSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }
    // PROCESS IMAGE
    const processimage = async () => {
        const filePath = path_1.default.posix.join("media", "products", `EASY_SHOP_${Math.random()
            .toString()
            .slice(2, 12)}_${Date.now()}.${file.mimetype.split("/").pop()}`);
        const compressedImage = await (0, sharp_1.default)(file.buffer)
            .resize({ width: 600 })
            .toBuffer();
        // Write file to media folder
        fs_1.default.writeFile(filePath, compressedImage, (err) => {
            if (err)
                throw err;
        });
        return filePath;
    };
    const imageURL = await processimage();
    const product = await product_1.default.create({
        ...req.body,
        price: JSON.parse(req.body.price),
        image: imageURL,
    });
    return res
        .status(201)
        .json((0, utils_1.apiResponse)(res.statusCode, "Your item was successfully added!", product));
});
exports.default = add;
