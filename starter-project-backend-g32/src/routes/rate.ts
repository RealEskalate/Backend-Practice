import { Router } from "express";
import {
  createRate,
  getRates,
  getRate,
  updateRate,
  deleteRate,
} from "../controllers/rate";
const router = Router({mergeParams: true});

router.route("/").post(createRate).get(getRates);
router.route("/:rateID").get(getRate).put(updateRate).delete(deleteRate);

export default router;
