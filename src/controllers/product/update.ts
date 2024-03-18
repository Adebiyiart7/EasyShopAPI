import { Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";

import { productSchema } from "../../config/validation";
import { apiResponse } from "../../utils";
import asyncHandler from "../../middleware/async";
import Product from "../../models/product";

interface CustomRequest {
  body: any;
  file: Express.Multer.File;
  query: { id: string };
}
/**
 * @route         POST /products/update
 * @description   update product
 * @access        private
 */
const update = asyncHandler(async (req: CustomRequest, res: Response) => {
  // Validate product
  const file = req.file;

  if (!file) {
    res.status(404);
    throw new Error("Image not provided");
  }

  const { error } = productSchema.validate(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.message);
  }

  // PROCESS IMAGE
  const processimage = async () => {
    const filePath = path.posix.join(
      "media",
      "products",
      `EASY_SHOP_${Math.random()
        .toString()
        .slice(2, 12)}_${Date.now()}.${file.mimetype.split("/").pop()}`
    );

    const compressedImage = await sharp(file.buffer)
      .resize({ width: 600 })
      .toBuffer();

    // Write file to media folder
    fs.writeFile(filePath, compressedImage, (err: any) => {
      if (err) throw err;
    });

    return filePath;
  };

  const imageURL = await processimage();

  await Product.updateOne(
    { _id: req.query.id },
    {
      ...req.body,
      price: JSON.parse(req.body.price),
      image: imageURL,
    }
  );

  return res
    .status(200)
    .json(
      apiResponse(res.statusCode, "Your item was successfully updated!", true)
    );
});

export default update;
