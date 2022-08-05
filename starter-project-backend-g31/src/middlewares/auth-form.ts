import Joi from 'joi';
import { NextFunction, Request, Response } from 'express'

export const authFormRequest = (schemaName: string) => async (req: Request, res: Response, next: NextFunction) => {
    let validationObjects: any = {
        loginUser: () =>
            Joi.object({
                email: Joi.string().email().max(256).required(),

                password: Joi.string().min(4).required()

            }),
        createUser: () =>
            Joi.object({
                password: Joi.string().min(4).required(),

                repeat_password: Joi.ref('password'),

                email: Joi.string().email().max(256).required(),
            }),
        forgetPassword: () =>
            Joi.object({
                email: Joi.string().email().max(256).required(),
            }),
    }
    try {
        const {
            error
        } = validationObjects[schemaName]().validate(req.body)
        if (!error) {
            return next();
        }
        throw new Error(error)
    } catch (e) {
        res.status(400).json({
            error: true,
            message: e
        })
    }

}