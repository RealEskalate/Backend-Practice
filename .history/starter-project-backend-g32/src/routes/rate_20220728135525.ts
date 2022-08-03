import { Router } from "express";
import { createRate } from "../controllers/rate";
const Rate
const router = Router();

router.post("/", createRate);
