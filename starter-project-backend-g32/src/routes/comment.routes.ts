import express from 'express';

const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.get('/', commentController.getComments); // get all comments
router.get('/:id' , commentController.getComment); // get comment by id
router.post('/' , commentController.createComment); // create comment
router.put('/:id' , commentController.updateComment); // update comment
router.patch('/:id' , commentController.patchComment); // patch comment
router.delete('/:id' , commentController.deleteComment); // delete comment

module.exports =  router;