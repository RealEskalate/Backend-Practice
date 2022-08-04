import { model, Schema } from "mongoose";

interface IUserProfile {
    firstName: string;
    lastName: string;
    gender: string;
    profilePicture: string;
}

const userProfileSchema = new Schema<IUserProfile>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true });

const UserProfile = model("UserProfile", userProfileSchema);

export default UserProfile;
