import {Request, Response} from "express"

import { Model, Mongoose, Schema } from "mongoose"
import { destructProfile } from "../helper/userprofilehelper"
import {UserProfile} from "../models/UserProfile"
import cloudinary from "../utils/cloudinary"


export const getProfileHandler = async function(req: Request, res: Response){
    try{

        const profile = await UserProfile.findById(req.params.id);
        if(!profile) throw Error("Profile doesnt exist"); 
        
        res.status(200).json(profile)
        
    } catch(err) { 
        res.status(404).json(err);
    }
}

export const getProfilesHandler = async function(req: Request, res: Response){
    try{
        const userProfiles = await UserProfile.find({});
        res.status(200).json(userProfiles)
        
    } catch(err) { 
        res.status(404).json(err);
    }
}

export const updateProfileHandler = async function(req: Request, res: Response){
    try{
        const profileUpdate = await destructProfile( req.body, req.file, req.params.id)
        
        const profile = await UserProfile.updateOne({_id: req.params.id}, {$set: profileUpdate})
        res.json(profile)     
    } catch(err) { 
        res.status(400).json(err);}
}

export const deleteProfileHandler = async function(req: Request, res: Response){
    try{
        
        await UserProfile.deleteOne({_id: req.params.id}).then(async (result: any) => {
            await cloudinary.uploader.destroy(`${req.params.id}_avatar`)
            res.status(204).json(result)
        })
        
    } catch(err) { 
        res.status(400).json(err);}
}

export const createProfileHandler = async function(req: Request, res: Response){
    try{
        const profile = await destructProfile(req.body, req.file)

         await UserProfile.create(profile).then( result => {
            res.status(201).json(result)
            
        })} catch(err: any) { 
        console.log(err.toString())
        res.status(400).json(err);}
}