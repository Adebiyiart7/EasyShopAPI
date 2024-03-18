import { Response } from "express";

import { apiResponse } from "../../utils";
import asyncHandler from "../../middleware/async";
import Product from "../../models/product";

interface CustomRequest {
  query: { id: string };
}
/**
 * @route         POST /products/delete
 * @description   delete product
 * @access        private
 */
const deleteProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    console.log(req.query.id);
    await Product.findOneAndDelete({ _id: req.query.id });

    return res
      .status(200)
      .json(
        apiResponse(res.statusCode, "Your item was successfully deleted!", true)
      );
  }
);

export default deleteProduct;
