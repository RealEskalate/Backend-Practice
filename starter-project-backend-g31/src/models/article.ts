import mongoose , { Schema, Document } from 'mongoose';
export interface IRatingScore{
    [details: number]:number;
    1:number;
    2:number;
    3:number;
    4:number;
    5:number;
};
export interface IArticle extends Document{
    author:string,
    content:string,
    comment:string,
    rating:IRatingScore,
    average:Number,
    postdate:Date,
    addRating(val:Number):void,
    updateRate(prev:Number,current:Number):void
} 


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
    average:{
        type:Number,
        default:0
    },
    rating: {
        type:Object,
        default:
        {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0
        },
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

articleSchema.methods.addRating = function(val:number){
this.rating[val]+=1
this.average = averageRating(this)
this.markModified("rating")
this.save()
}
articleSchema.methods.updateRate = function(prev:number,current:number){
    this.rating[prev]--;
    this.rating[current]++;
    this.average= averageRating(this)
    this.markModified("rating")
    this.save()
}
const averageRating = (article:IArticle)=>{
    const average = (article.rating[1]  * 1 
                    + article.rating[2] * 2
                    + article.rating[3] * 3
                    +article.rating[4]  * 4
                    +article.rating[5]  * 5
                    ) / (article.rating[1]
                        +article.rating[2]
                        +article.rating[3]
                        +article.rating[4]
                        +article.rating[5])
return average
}
export const Article = mongoose.model<IArticle>('Article', articleSchema);