import { Router } from "express";
import {
  createRate,
  getRates,
  getRate,
  updateRate,
  deleteRate,
} from "../controllers/rate.controller";
const router = Router({ mergeParams: true });

router.route("/").post(createRate).get(getRates);
router.route("/:rateId").get(getRate).put(updateRate).delete(deleteRate);

export default router;
