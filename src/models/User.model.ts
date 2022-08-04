import mongoose from "mongoose";

import { Document } from "mongoose";

export default interface IUser extends Document {
    username : string;
    password: string;
} 
const UserSchema = new mongoose.Schema(
    {
        username : {type : String , required : true ,unique : true },
    //    UserProfile to be type of UserProfile Object and is going to be referenced 
        password : {
            type: String,
            required: [true, "password is required"],
            min: [8, "password can not be less than 8 characters"],
            max: [25, "password can not be more than 25 characters"], }
    },
    {
        timestamps : true
    }
);

export const User = mongoose.model("User" , UserSchema);
