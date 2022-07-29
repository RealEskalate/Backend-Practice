import {Request, Response} from "express"

import { Model, Mongoose, Schema } from "mongoose"
import {UserProfile} from "../models/UserProfile"
import { createProfile, deleteProfile, getProfile, updateProfile } from "../service/userProfileService"

export const getProfileHandler = async function(req: Request, res: Response){
    try{
        const userProfile = await getProfile(req.params.id)
        res.status(200).json(userProfile)
        
    } catch(err) { 
        res.status(400).json(err)
        console.log(err);
    }
}

export const updateProfileHandler = async function(req: Request, res: Response){
    try{
        
        const profile = await updateProfile(req.params.id, req.body)
        res.json(profile)
        
    } catch(err) { 
        res.status(400).json(err)
        console.log(err);}
}

export const deleteProfileHandler = async function(req: Request, res: Response){
    try{
        
        await deleteProfile(req.params.id)
        
        res.status(204)
        
    } catch(err) { 
        res.status(400).json(err)
        console.log(err);}
}

export const createProfileHandler = async function(req: Request, res: Response){
    try{
        const userProfile = req.body
        const profile = await createProfile(userProfile)
        res.status(201).json(profile)
        

    }catch(err) { 
        res.status(400).json(err)
        console.log(err);}
}