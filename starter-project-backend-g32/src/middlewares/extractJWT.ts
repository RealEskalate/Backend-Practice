import { Request ,Response ,NextFunction } from "express";
import jwt from 'jsonwebtoken';

import config from "../config/config";

export const extractJWT = (req : Request , res : Response , next : NextFunction) => {
    console.log("validating Token");
    
    let token = req.headers.authorization?.split(" ")[1]
    
    if (token) { 
        jwt.verify(token , config.server.token.secret , (err , decoded) => {

            if (err) {
                return res.status(404).json({
                    message: err,
                   
                });
            } else {
               
                res.locals.jwt = decoded;
                next();
            }

        });

    } else {
        return res.status(401).json({
            message : "Unauthorized trial"
        });
    }


}  