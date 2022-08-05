import * as jwt from 'jsonwebtoken';
import { signupUser } from '../services/auth-service';
import { userModel } from '../models/user-model';
import { NextFunction, Request, Response } from 'express'

/*
@Description: Sign in a user
@Route: auth/login/
@Access: Public
*/
export const login = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
        const user = await userModel.findOne({ 
            email: req.body.email 
        })
        
        if(user && await user.verifyPassword(req.body.password)){
            const key: any = process.env.JWT_KEY
            return res.status(200).json({ 
                ...user._doc, 
                token: jwt.sign({data: user._doc}, key, { algorithm: 'HS256', expiresIn: "9999d"  }) 
            });
        }
        else{
            if(!user){
                return res.status(404).json({ data: "User not found, please sign up" })
            }
            else{
                return res.status(400).json({ data: "Incorrect username or password" })
            }
        }
    
        
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message })
    }
  }



/*
@Description: Sign Up a user
@Route: auth/signup/
@Access: Public
*/
export const signup = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const user: any = await signupUser(req); 
      return res.status(201).json({ data: { _id: user._id, email: user.email } })
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message })
    }
  }
