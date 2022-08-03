import mongoose,{Schema,Document} from "mongoose"


interface IUserProfile extends Document {
    name: string,
    bio: string,
    phone:string,
    profilePicture:string
}

const UserProfileSchema:Schema<IUserProfile> = new mongoose.Schema({
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
        type: String,
        required: false
    }

});

export const UserProfile = mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
