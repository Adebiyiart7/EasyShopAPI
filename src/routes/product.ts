const express = require("express");
import add from "../controllers/product/add";
import fetch from "../controllers/product/fetch";
import deleteProduct from "../controllers/product/delete";
import update from "../controllers/product/update";

const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", fetch);
router.post("/add", upload.single("image"), add);
router.put("/update", upload.single("image"), update);
router.delete("/delete", deleteProduct);

module.exports = router;
