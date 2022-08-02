import { Router, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import controller from './controller'

const router = Router()

// TODO: document with docstring
router.get('/', controller.getAllUser)  
router.get('/:id', controller.getUser)
router.post('/create', controller.create)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

export = router
