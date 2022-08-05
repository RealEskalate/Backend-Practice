import { fileURLToPath } from "url"
import cloudinary from "../utils/cloudinary"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export async function destructProfile( body: any, file: any, id?: any){

    if(id && file.path){
        await cloudinary.uploader.destroy(`${id}_avatar`)
    }

    var {_id,  name, username, bio, phone } =  body

        

        interface Profile{
            _id?: string,
            name?: string,
            username?: string,
            bio?: string,
            phone?: string,
            avatar?: string
        }
    
        var newProfile: Profile = {}
    
        newProfile["_id"] = id? id:  new mongoose.Types.ObjectId().toString()
        if (username)   newProfile["username"] = username
        if (name)   newProfile["name"] = name
        if (bio)    newProfile["bio"] = bio
        if (phone)  newProfile["phone"] = phone

        const result = await cloudinary.uploader.upload(file.path, {
            public_id: `${newProfile["_id"]}_avatar`,
            folder: process.env.FOLDER,
            width: 500,
            height: 500,
            crop: 'fill'
        })

        if (result.url) newProfile["avatar"] = result.url
        
        console.log(newProfile)
        return newProfile

}