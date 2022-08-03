import { Router } from "express";
import { createRate, getRates, getRate, updateRate, deleteRate } from "../controllers/rate";
const router = Router();

router.route("/").post(createRate);
// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
export default router;
