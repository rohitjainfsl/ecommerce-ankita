import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  actualPrice: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
});

const Product = model("product", productSchema);
export default Product;
