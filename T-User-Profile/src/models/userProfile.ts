import mongoose, {Schema, Document} from "mongoose";

export interface UserInfo extends Document{
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    phoneNumber: String,
}


const userProfileSchema = new mongoose.Schema<UserInfo>(
    {
        firstName: {
            type: String,
            required : true,
            minlength: 6,
            maxlength: 15
        },
        lastName: {
            type: String,
            required : true,
            minlength: 6,
            maxlength: 15
        },
        role: {
            type: String,
            required : true,
        },
        email: {
            type: String,
            unique: true,
        },
        phoneNumber: {
            type: String,
            minlength: 10,
            maxlength: 10
        }
    }

);

const User = mongoose.model<UserInfo>("User", userProfileSchema);
export default User;