import mongoose, { Schema, Document } from 'mongoose';
import IuserInterface from './interface'
import IChapterInterface from '../chapters/interface';

const UserSchema:Schema =  new Schema({
    name: {
        type:String, 
        required: 'Name is required'
    }, 
    email: {
        type:String, 
        required:true, 
        unique:true
    }, 
    bio: {
        type:String
    },
    profileImage: {
        type:String
    }, 
    isActive: {
        type: Boolean
    }, 
    chapter: {
        type: String
    }
})
export default mongoose.model<IuserInterface>('User', UserSchema);