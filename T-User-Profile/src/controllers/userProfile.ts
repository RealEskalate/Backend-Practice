import User from "../models/userProfile";
import {Request, Response} from 'express';
import mongoose from "mongoose";

export const createUserProfile =  async function(req :Request, res:Response){
    try
    {
    const {firstName, lastName, role, email, phoneNumber} = req.body;
    let user = new User({firstName, lastName, role, email, phoneNumber});
    const newUser = await user.save();
    return res.status(201).json({data: newUser});
}
catch{
    return res.status(500).json({data: "creation of user failed"})
}
}


export const getUserProfile = async function(req :Request, res:Response){
            const users = await User.find()
                .catch(() => {
                    return res.status(500).json({data: "retriving users failed..."});
                });
            return res.status(200).json({data: users});
}


export const updateById = async function(req: Request, res: Response){
    try
       { if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send('invalid id');

        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
         {
            new:true,
            runValidators: true,
        }
        );
        if (!user) return res.status(404).send('user not found');
        
        return res.status(201).json({data: user});
    }
        catch(err){
            return res.status(500).json({data: "error occur"});
        }
    
} 


export const getUserById = async function(req :Request, res:Response){

    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send('invalid id');
            
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({data: 'their is no such user in this id'});
        return res.status(200).json({data: user})
    }
    catch(err){
        return res.status(500).json({data: "retriving user failed"})
    }
}

export const deleteUser = async function(req :Request, res:Response){
    try
    { if(!mongoose.Types.ObjectId.isValid(req.params.id))
         return res.status(404).send('invalid id');

     const user = await User.findByIdAndDelete(req.params.id);
     if (!user) return res.status(404).send('user not found');
     
     return res.status(201).json({data: "deleted succesfully"});
    }
     catch(err){
         res.status(500).json({data: "error occur"});
     }
 
}
