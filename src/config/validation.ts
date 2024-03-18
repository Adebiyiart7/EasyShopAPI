import Joi from "joi";

// PRODUCT
export const productSchema = Joi.object({
  userId: Joi.string().required().label("User ID"),
  name: Joi.string().required().min(3).max(255).label("Product Name"),
  price: Joi.string().required().label("Price"),
});
