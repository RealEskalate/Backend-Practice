import User from "../models/userProfile";


export const createUserProfile =  async function createUser (){
    try{
        const userProfile = new User();
        const profile = await userProfile.save();
        return profile;
    }
    catch(err){
        console.log(err);
    } 
}


export const getUserProfile = async function(){
            try{
                const users = await User.find();
            return users;
            }
            catch(err){
                console.log(err);
            } 
}
export const getUserProByRole = async function(){
    try{
        const byrole = await User.find({role: 'admin'});
    return byrole;
    }
    catch(err){
        console.log(err);
    } 
}

export const updateById = async function(id: String, name: any, userRole: any){
    try{
        const user = await User.findById(id);
    if (!user) return;

    user.role = userRole;
    user.firstName = name;
    const result = await user.save();
    return result;
    }
    catch(err){
        console.log(err);
    } 
}

export const deleteUser = async function (id: any){
    try{
// const result = await User.deleteOne({_id: id});
const result = await User.findByIdAndRemove(id);
return result;
    }
    catch(err){
        console.log(err);
    }   
}
