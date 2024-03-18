import express from "express";
import add from "../controllers/product/add";
import fetch from "../controllers/product/fetch";
import deleteProduct from "../controllers/product/delete";
import update from "../controllers/product/update";

const productsRouter = express.Router();
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

productsRouter.get("/", fetch);
productsRouter.post("/add", upload.single("image"), add);
productsRouter.put("/update", upload.single("image"), update);
productsRouter.delete("/delete", deleteProduct);

export default productsRouter;
