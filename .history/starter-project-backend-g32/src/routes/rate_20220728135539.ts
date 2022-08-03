import { Router } from "express";
import { createRate } from "../controllers/rate";
import Ra
const router = Router();

router.post("/", createRate);
