import {Request, Response} from "express"

import { Model, Mongoose, Schema } from "mongoose"
import { destructProfile } from "../helper/userprofilehelper"
import { UserProfile } from "../models/UserProfile"
import cloudinary, { upload, update, remove} from '../utils/cloudinary'

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
    try {
        const foundProfile = await UserProfile.findOne({ _id: req.params.id });
        if (foundProfile && req.file) {
                let avatar, photo_id
            [avatar, photo_id] = await update(foundProfile.photo_id, req.file.path)
                foundProfile.avatar = avatar
                foundProfile.photo_id = photo_id
                foundProfile.save()
            }
        const profile = await UserProfile.updateOne({ _id: req.params.id }, { $set: await destructProfile(req.body) })
        res.json(profile)     
    } catch(err) { 
        res.status(400).json(err);}
}

export const deleteProfileHandler = async function(req: Request, res: Response){
    try{
        const foundProfile = await UserProfile.findOne({ _id: req.params.id });
        if (foundProfile && foundProfile.photo_id) {
                let deleted = await remove(foundProfile.photo_id)
                if(!deleted) throw Error('image not deleted')
            }
        await UserProfile.deleteOne({ _id: req.params.id }).then((profile: any) => {
            res.status(204).json()
        })
        
    } catch(err) { 
        res.status(400).json(err);}
}

export const createProfileHandler = async function(req: Request, res: Response){
    try {
        const profile = await UserProfile.create(await destructProfile(req.body)).then(async profile => {
            if (profile && req.file) {
                let avatar, photo_id
                [avatar , photo_id] = await upload(req.file.path)
                profile.avatar = avatar
                profile.photo_id = photo_id
                profile.save()
            }
            res.status(201).json(profile)
            
        })} catch(err: any) {
        res.status(400).json(err);}
}