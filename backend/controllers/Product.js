import Product from "../models/product.js";

export async function addProduct(req, res) {
  try {
    const { name, slug, category, actualPrice, discountedPrice, description } =
      req.body;
    const image = req.file.filename;
    const newProduct = new Product({
      name,
      slug,
      category,
      actualPrice,
      discountedPrice,
      description,
      image,
    });
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product Added", newProduct: newProduct.slug });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function fetchProducts(req, res) {
  try {
    const allProducts = await Product.find({});
    if (allProducts.length === 0)
      return res.status(204).json({ message: "No Products Found" });
    return res.json(allProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
