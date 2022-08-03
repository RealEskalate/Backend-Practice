import { Router } from "express";
import { createRate, get } from "../controllers/rate";
const router = Router();

router.route("/").post(createRate);

export default router;
