import mongoose from 'mongoose';
import express from 'express';
import {getMany, getOne, createArticle, updateOne, deleteOne} from '../controllers/article';


const router = express.Router();
router.get('/', getMany);
router.get('/:id', getOne);
router.post('/', createArticle);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router;