import express, { Router } from "express"
const router = express.Router()
import {
    getAllComment,
    getCommentById,
    addComment,
    updateCommentById,
    deleteCommentById
} from '../controller/task'

router.get('/',getAllComment)
router.get('/:id',getCommentById)
router.post('/',addComment)

router.patch('/:id',updateCommentById)

router.delete('/:id',deleteCommentById)
    
export const commentRoute = router