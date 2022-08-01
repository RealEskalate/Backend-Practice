import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import controller from './controller'

const router = express.Router()
router.get('/getall', controller.readAllUser)
router.get('/get/:userId', controller.readOneUser)
router.post('/signup', controller.signUp)
router.put('/update/:userId', controller.updateOneUser)
router.delete('/delete/:userId', controller.deleteOneUser)

export = router
