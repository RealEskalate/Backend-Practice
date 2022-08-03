import { Router } from "express";
import { createRate, getRates, getRate, updateRate, deleteRate } from "../controllers/rate";
const router = Router();

router.route("/").post(createRate).get(getRates);

export default router;
