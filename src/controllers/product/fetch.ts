import { Request, Response } from "express";
import { apiResponse } from "../../utils";
import asyncHandler from "../../middleware/async";
import Product from "../../models/product";

/**
 * @route         GET   /products/
 * @description   Fetches products by user id
 * @access        public
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({ userId: req.query.userId }).sort({
    updatedAt: -1,
  });

  res.status(200).json(apiResponse(res.statusCode, "", products));
});
