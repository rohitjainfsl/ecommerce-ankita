import Router from "express";
import { login, logout, me, register } from "../controllers/Auth.js";
import { verifyToken } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", verifyToken, me);

export default authRouter;
