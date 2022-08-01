import express from 'express';
import commentRouter from './comment.routes';
const router = express.Router();

router.use("/comment", commentRouter);

module.exports = router;