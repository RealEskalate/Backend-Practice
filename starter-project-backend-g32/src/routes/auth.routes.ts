import { Router } from "express";
import { login , logout } from "../middlewares/authentication.middleware";
import {verifyToken} from "../middlewares/authentication.middleware";
import { createUser } from "../controllers/user.controller";

const authRouter = Router();
authRouter.post("/login",login);
authRouter.post("/signup", createUser);
authRouter.post("/logout", [verifyToken] ,logout);

export default authRouter;
