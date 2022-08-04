import mongoose , { Schema, Document } from 'mongoose';

export interface IArticle extends Document{
    author:string,
    content:string,
    comment:string,
    rating: IHash,
    averageRating: Number,
    postdate:Date,
    addRating(val: number): void,
    updateRating(prev: number, current: number): void
} 
export interface IHash  {
    [details: number]: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };



const articleSchema: Schema<IArticle> = new mongoose.Schema({
    author: {
        type: String,
        minlength: 5,
        maxlength:50,
        required: true
    },
    content: {
        type: String,
        minLength: 20,
        maxLength: 10000,
        required: true,
    },
    rating: {
        type: Object,
        default:  {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    },
	averageRating: {
        type: Number,
        default: 0
    },
    comment: {
        type: [ String ],
        maxlength: 5000,
        minlength: 1
    },
    postdate: {
        type: Date,
        default: Date.now()
    }
});

articleSchema.methods.addRating = function(val: number) {
    
    this.rating[val]++;
    const totalRating = (this.rating[1] * 1) + (this.rating[2] * 2) + (this.rating[3] * 3) + (this.rating[4] * 4) + (this.rating[5] * 5)
    const frequency = this.rating[1] + this.rating[2] + this.rating[3] + this.rating[4] + this.rating[5];
    this.averageRating = totalRating / frequency
    this.markModified("rating")
    this.save()
}  
articleSchema.methods.updateRating = function(prev: number, current: number) {
    this.rating[prev]--;
    this.rating[current]++;
    const totalRating = (this.rating[1] * 1) + (this.rating[2] * 2) + (this.rating[3] * 3) + (this.rating[4] * 4) + (this.rating[5] * 5)
    const frequency = this.rating[1] + this.rating[2] + this.rating[3] + this.rating[4] + this.rating[5];
    this.averageRating = totalRating / frequency
    this.markModified("rating")
    this.save()
}

export const Article = mongoose.model<IArticle>('Article', articleSchema);