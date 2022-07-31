import mongoose, {Schema, Document} from "mongoose";

export interface UserInfo extends Document{
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    phoneNumber: String,
}


const userProfileSchema: Schema<UserInfo> = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        role: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        phoneNumber: {
            type: String,
        }
    }

);

const User = mongoose.model<UserInfo>("User", userProfileSchema);
export default User;