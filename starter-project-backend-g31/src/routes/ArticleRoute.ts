
import express from 'express';
import mongoose from 'mongoose';
const {getMany,getById,createArticle,deleteOne,updateOne} =  require('../controller/ArticleController');

const router = express.Router();

router.get('/:id', getById);
router.get('/', getMany);
router.post('/', createArticle);
router.delete('/:id', deleteOne);
router.put('/:id', updateOne);

module.exports = router;


