import express from 'express';
import commentRouter from './comment.routes';
const router = express.Router();

router.use("/comment", commentRouter);

export default router;