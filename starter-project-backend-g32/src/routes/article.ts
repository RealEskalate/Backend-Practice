import { Router } from "express";
import {
  getArticles,
  getArticle,
  createArticle,
} from "../controllers/article.controller";
import rateRouter from "./rate";

const router = Router({ mergeParams: true });
router.use("/:articleId/rates", rateRouter);

router.route("/").get(getArticles).post(createArticle);
router.route("/:articleId").get(getArticle);

export default router;
