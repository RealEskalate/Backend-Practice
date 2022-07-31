import { resolve } from "path/posix";
import { UserProfile } from "../models/UserProfile";


export const createProfile = async function(userProfile:any){


    const profile = new UserProfile(userProfile);
    profile.save();
    return profile;

    
}

export const getProfile = async function(id:string){

    const profile = await UserProfile.findById(id);
  
    if(profile.id === id) {
        return profile;
    }


    
}

export const getProfiles = async function(){

    const profiles = await UserProfile.find({});
  
    return profiles;

    
}



export const updateProfile = async function(id:string, userProfile:any){

        
    const res = await UserProfile.updateOne({_id: id}, {$set: userProfile})
  
    return res;

    
}

export const deleteProfile = async function(id:string){

    const res = await UserProfile.deleteOne({_id: id});
    return res
    
   
}