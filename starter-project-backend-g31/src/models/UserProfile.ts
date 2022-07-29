import mongoose from "mongoose"

const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    bio: {
        type: String
    },

    phone: {
        type: String
    },

    profilePicture: {
        
        required: false
    }

});

export const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
