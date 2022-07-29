import { UserProfile } from "../models/UserProfile";


export const createProfile = async function(userProfile:any){
    try{

    const profile = new UserProfile(userProfile);
    profile.save();
    return profile;

    }catch(err){
        console.log(err);
    }
    
}

export const getProfile = async function(id:string){
    try{
        
    const profile = await UserProfile.findById(id);
  
    return profile;

    }catch(err){
        console.log(err);
    }
    
}



export const updateProfile = async function(id:string, userProfile:any){
    try{
        
    const profile = await UserProfile.updateOne({_id: id}, {$set: userProfile})
  
    return profile;

    }catch(err){
        console.log(err);
    }
    
}

export const deleteProfile = async function(id:string){
    try{
        
    UserProfile.deleteOne({_id: id})
    }catch(err){
        console.log(err);
    }
    
}