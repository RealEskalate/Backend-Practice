import mongoose from 'mongoose';
import express from 'express';
import {getMany, getOne, createArticle, updateOne, deleteOne} from '../controllers/article';
import upload from "../utils/multer"

const router = express.Router();
router.get('/', getMany);
router.get('/:id', getOne);
router.post('/', upload.single("image"), createArticle);
router.put('/:id', upload.single("image"), updateOne);
router.delete('/:id', deleteOne);

export default router;