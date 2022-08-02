import {Request, Response} from "express"

import { Model, Mongoose, Schema } from "mongoose"
import { destructProfile } from "../helper/userprofilehelper"
import {UserProfile} from "../models/UserProfile"
import { createProfile, deleteProfile, getProfile, getProfiles, updateProfile } from "../service/userProfileService"

export const getProfileHandler = async function(req: Request, res: Response){
    try{
        const userProfile = await getProfile(req.params.id)
        res.status(200).json(userProfile)
        
    } catch(err) { 
        res.status(404).json(err);
    }
}

export const getProfilesHandler = async function(req: Request, res: Response){
    try{
        const userProfiles = await getProfiles()
        res.status(200).json(userProfiles)
        
    } catch(err) { 
        res.status(404).json(err);
    }
}

export const updateProfileHandler = async function(req: Request, res: Response){
    try{

        
        const profile = await updateProfile(req.params.id, destructProfile(req.body))
        res.json(profile)     
    } catch(err) { 
        res.status(400).json(err);}
}

export const deleteProfileHandler = async function(req: Request, res: Response){
    try{
        
        await deleteProfile(req.params.id).then(result => {
            res.status(204).json(result)
        })
        
    } catch(err) { 
        res.status(400).json(err);}
}

export const createProfileHandler = async function(req: Request, res: Response){
    try{
        
        const profile = await createProfile( destructProfile(req.body)).then( profile => {
            res.status(201).json(profile)
            
        })} catch(err: any) { 
        console.log(err.toString())
        res.status(400).json(err);}
}