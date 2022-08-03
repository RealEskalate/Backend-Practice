import mongoose from 'mongoose';



const articleSchema = new mongoose.Schema({
    Author: {
        type: String,
        minlength: 5,
        maxlength:50,
        required: true
    },
    Content: {
        type: String,
        minLength: 20,
        maxLength: 10000,
        required: true,
    },
    Rating: {
		1: Number,
		2: Number,
		3: Number,
		4: Number,
		5: Number
    },
	averageRating: Number,
    Comment: {
        type: [ String ],
        maxlength: 5000,
        minlength: 1
    },
    postDate: {
        type: Date,
        default: Date.now()
    }
});



export const Article =  mongoose.model('Article', articleSchema);