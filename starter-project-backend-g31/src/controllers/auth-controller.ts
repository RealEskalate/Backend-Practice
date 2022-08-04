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
            return res.status(201).json({ 
                ...user._doc, 
                token: jwt.sign({data: user._doc}, process.env.JWT_KEY || "mongodb://localhost:27017/test", { algorithm: 'HS256', expiresIn: "9999d"  }) 
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
    
        
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Logging in operation failed' })
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
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Signing up operation failed' })
    }
  }


/*
@Description: Logout a user
@Route: auth/logout/
@Access: Public
*/
export const logout = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
        return res.status(201).json({ 
            status: true, 
            data: 'logging out'          
        }) 
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Logging out user failed' })
    }
  }
  