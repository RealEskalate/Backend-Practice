import { Router } from "express";
import { createRate } from "../controllers/rate";
const 
const router = Router();

router.post("/", createRate);
