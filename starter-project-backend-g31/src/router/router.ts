import express from "express"
const router = express.Router()
const {
    getAllComment,
    getCommentById,
    addComment,
    updateCommentById,
    deleteCommentById
} = require('../controller/task')

router.get('/',getAllComment)
router.get('/:id',getCommentById)
router.post('/',addComment)

router.patch('/:id',updateCommentById)

router.delete('/:id',deleteCommentById)
    
module.exports = router