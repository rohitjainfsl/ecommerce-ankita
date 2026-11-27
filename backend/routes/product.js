import Router from "express";
import { addProduct, fetchProducts } from "../controllers/Product.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const productRouter = Router();

productRouter.post("/add", verifyToken, isAdmin, upload.single("image"), addProduct);
productRouter.get("/", fetchProducts);

export default productRouter;
