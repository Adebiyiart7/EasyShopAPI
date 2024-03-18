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
const router = express_1.default.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/", fetch_1.default);
router.post("/add", upload.single("image"), add_1.default);
router.put("/update", upload.single("image"), update_1.default);
router.delete("/delete", delete_1.default);
module.exports = router;
