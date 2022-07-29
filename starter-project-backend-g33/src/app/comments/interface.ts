import mongoose, { Schema, Document } from 'mongoose';

interface commentInterface extends Document {

    articleId: String;
    content: String;
    commentOwner: String;
    replies: String[];

}

export default commentInterface
