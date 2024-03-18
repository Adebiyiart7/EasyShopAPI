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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const validation_1 = require("../../config/validation");
const utils_1 = require("../../utils");
const async_1 = __importDefault(require("../../middleware/async"));
const product_1 = __importDefault(require("../../models/product"));
/**
 * @route         POST /products/update
 * @description   update product
 * @access        private
 */
const update = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const processimage = () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.posix.join("media", "products", `EASY_SHOP_${Math.random()
            .toString()
            .slice(2, 12)}_${Date.now()}.${file.mimetype.split("/").pop()}`);
        const compressedImage = yield (0, sharp_1.default)(file.buffer)
            .resize({ width: 600 })
            .toBuffer();
        // Write file to media folder
        fs_1.default.writeFile(filePath, compressedImage, (err) => {
            if (err)
                throw err;
        });
        return filePath;
    });
    const imageURL = yield processimage();
    yield product_1.default.updateOne({ _id: req.query.id }, Object.assign(Object.assign({}, req.body), { price: JSON.parse(req.body.price), image: imageURL }));
    return res
        .status(200)
        .json((0, utils_1.apiResponse)(res.statusCode, "Your item was successfully updated!", true));
}));
exports.default = update;
//# sourceMappingURL=update.js.map