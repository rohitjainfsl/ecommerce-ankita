import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import productRouter from "./routes/product.js";
import connectToDB from "./config/db.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

const corsOrigin = {
  origin: process.env.FRONTEND_URI,
};

app.use(cors(corsOrigin));
app.use(express.json());
app.use(cookieParser());

await connectToDB();

//API
app.use("/api/product", productRouter);

app.listen(PORT, () => console.log("Server started at " + PORT));
