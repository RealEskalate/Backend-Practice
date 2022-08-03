import { Router } from "express";
import { createRate, updateRate,  } from "../controllers/rate";
const router = Router();

router.route("/").post(createRate);

export default router;
