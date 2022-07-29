import mongoose, { Schema, Document } from 'mongoose';
import chapterInterface from '../chapters/interface';

interface userInterface extends Document {
    
    name: String;
    email: String;
    bio: String;
    profileImage: String;
    isActive: Boolean;
    chapter: chapterInterface['_id'];

}

export default userInterface
