"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_1 = __importDefault(require("../controllers/product/add"));
const fetch_1 = __importDefault(require("../controllers/product/fetch"));
const delete_1 = __importDefault(require("../controllers/product/delete"));
const update_1 = __importDefault(require("../controllers/product/update"));
const productsRouter = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
productsRouter.get("/", fetch_1.default);
productsRouter.post("/add", upload.single("image"), add_1.default);
productsRouter.put("/update", upload.single("image"), update_1.default);
productsRouter.delete("/delete", delete_1.default);
exports.default = productsRouter;
//# sourceMappingURL=product.js.map