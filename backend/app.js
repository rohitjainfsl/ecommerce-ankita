import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import connectToDB from "./config/db.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

const corsOrigin = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
};

app.use(cors(corsOrigin));
app.use(express.json());
app.use(cookieParser());

// Serve uploaded images: http://localhost:PORT/uploads/<filename>
app.use("/uploads", express.static("uploads"));

await connectToDB();

//API
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => console.log("Server started at " + PORT));
