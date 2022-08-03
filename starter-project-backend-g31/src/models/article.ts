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
		1: {
			type: Number,
			default: 0
			},
		2: {
			type: Number,
			default: 0
			},
		3: {
			type: Number,
			default: 0
			},
		4: {
			type: Number,
			default: 0
			},
		5: {
			type: Number,
			default: 0
			}
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