import { Router } from "express";
import { createRate, ge } from "../controllers/rate";
const router = Router();

router.route("/").post(createRate);

export default router;
