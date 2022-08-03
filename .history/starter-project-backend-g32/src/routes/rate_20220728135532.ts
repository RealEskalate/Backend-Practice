import { Router } from "express";
import { createRate } from "../controllers/rate";
const RateModel = require("../models/Rate");
const router = Router();

router.post("/", createRate);
