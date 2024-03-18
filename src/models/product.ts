import mongoose, { Schema } from "mongoose";

interface Product {
  userId: string;
  name: string;
  price: number;
  image: string;
}

const productSchema = new Schema<Product>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Product>("Product", productSchema);
