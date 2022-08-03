import { model, Schema } from "mongoose";

const userProfile = {
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
}

const UserProfileSchema = new Schema(userProfile, { timestamps: true });
const UserProfile = model("UserProfile", UserProfileSchema);

export default UserProfile;
