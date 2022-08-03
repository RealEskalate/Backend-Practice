import { Router } from "express";
import { createRate } from "../controllers/rate";
import RateModel from "../models/Rate";

const router = Router();

router.post("/", createRate);
