import Router from "express";
import { addProduct } from "../controllers/Product.js";

const productRouter = Router();

productRouter.post("/add", addProduct);

export default productRouter;
