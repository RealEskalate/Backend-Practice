import {
    login,
    signup
} from '../controllers/auth-controller';
import * as express from 'express';
const authRouter = express.Router();
import { authFormRequest } from '../middlewares/auth-form'


/*
 * @route POST /auth/login/ 
 * @group Auth   
 * @param {number} email.body.required - email address of the user 
 * @param {string} password.body.required - password of the user 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
 authRouter.post('/login', authFormRequest('loginUser'), login); 
 
 /*
  * @route POST /auth/signup/ 
  * @group Auth  
  * @param {string} email.body.required - email address of the user 
  * @param {string} password.body.required - password of the user 
  * @returns {object} 200 - User object 
  * @returns {Error}  default - Unexpected error  
  */ 
 authRouter.post('/signup', authFormRequest('createUser'), signup); 
 
  

export const authRoute = authRouter; 

