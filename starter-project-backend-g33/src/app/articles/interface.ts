import userInterface from "../users/interface";
import mongoose, { Schema, Document } from 'mongoose';
import commentInterface from "../comments/interface";


interface articleInterface extends Document {
    id: String;
    title: String;
    content: String;
    Author: userInterface['_id'];
    featuredImage: String;
    tags: String[];
    clappers: userInterface['_id'][]; 
    commentCount: number;

}

export default articleInterface
