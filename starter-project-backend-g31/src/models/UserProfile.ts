import mongoose,{Schema,Document} from "mongoose"

export interface IProfile{
    name: string | undefined,
    username: string,
    bio: string | undefined,
    phone: string | undefined,
    avatar: string | undefined,
}
export const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    bio: {
        type: String
    },

    phone: {
        type: String
    },

    avatar: {
        
        required: false
    }

});

export const UserProfile = mongoose.model<IProfile>("UserProfile", UserProfileSchema);
