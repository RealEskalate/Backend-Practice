import mongoose from "mongoose";



const UserSchema = new mongoose.Schema(
    {
        username : {type : String , required : true ,unique : true },
        userProfile : {type : String  , required : true}, // the type of UserProfile to be type of UserProfile Object and is going to be referenced 
        password : {type : String , required : true}
    },
    {
        timestamps : true
    }
);

export const User = mongoose.model("User" , UserSchema);
// const UserProfileSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },

//     bio: {
//         type: String
//     },

//     phone: {
//         type: String
//     },

//     profilePicture: {
        
//         required: false
//     }

// });

// export const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
