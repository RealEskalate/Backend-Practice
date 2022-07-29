import mongoose, { Model, Schema } from 'mongoose';

export interface ProfileSchema {
    username: string;
    fullname: string;
    bio: string;
    phone: string;
    avatar?: null;
}

// 2. Create a Schema corresponding to the document interface.
const profileSchema = new Schema<ProfileSchema>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: false
    },
    Bio: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
    // phone-
    // profile-picture-
});

export const Profile: Model<string,Schema> = mongoose.model('profile', profileSchema);