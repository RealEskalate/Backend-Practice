import mongoose , { Schema, Document } from 'mongoose';

export interface IArticle extends Document{
    author:string,
    content:string,
    comment:string,
    rating: IHash,
    averageRating: number ,
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
    postdate: {
        type: Date,
        default: Date.now()
    }
});

articleSchema.methods.addRating = function(val: number) {
    this.rating[val]++;
    this.averageRating = calculateAverage(this)
    this.markModified("rating")
    this.save()
}  
articleSchema.methods.updateRating = function(prev: number, current: number) {
    this.rating[prev]--;
    this.rating[current]++;
    this.averageRating = calculateAverage(this) || this.averageRating
    this.markModified("rating")
    this.save()
}

const calculateAverage = (article: IArticle): number => {
	const totalRating = (article.rating[1] * 1) + (article.rating[2] * 2) + (article.rating[3] * 3) + (article.rating[4] * 4) + (article.rating[5] * 5)
    const frequency = article.rating[1] + article.rating[2] + article.rating[3] + article.rating[4] + article.rating[5];
    return totalRating / frequency
}

export const Article = mongoose.model<IArticle>('Article', articleSchema);