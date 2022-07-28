import mongoose from 'mongoose';
import express from 'express';
const {getMany, getOne, createArticle, updateOne, deleteOne} = require('../controllers/ArticleController');
const router = express.Router();

router.get('/', getMany);
router.get('/:id', getOne);
router.post('/', createArticle);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;