import express from 'express';

const router = express.Router();
const commentRouter = require('../routes/comment.routes');
router.use("/comment", commentRouter);

module.exports = router;