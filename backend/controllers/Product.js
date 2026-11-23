import Product from "../models/product.js";

export async function addProduct(req, res) {
  try {
    const { name, slug, category, actualPrice, discountedPrice, description } =
      req.body;
    const newProduct = new Product({
      name,
      slug,
      category,
      actualPrice,
      discountedPrice,
      description,
    });
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product Added", newProduct: newProduct.slug });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
