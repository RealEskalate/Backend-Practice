import mongoose, { Schema, Document } from 'mongoose';
import IChapterInterface from '../chapters/interface';

interface IUserInterface extends Document {
    
    name: String;
    email: String;
    bio: String;
    profileImage: String;
    isActive: Boolean;
    chapter: IChapterInterface['_id'];

}

export default IUserInterface
