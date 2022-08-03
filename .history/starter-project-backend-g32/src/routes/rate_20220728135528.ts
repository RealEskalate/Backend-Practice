import { Router } from "express";
import { createRate } from "../controllers/rate";
const RateM
const router = Router();

router.post("/", createRate);
