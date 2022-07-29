import RatingSchema from "./models/ratings";
// Create a rating instance
export const create = (json: { [x: string]: any; }) => {
   
    const rating = new RatingSchema({
        articleId: json["articleId"],
        userId: json["userId"],
        rating: json["rating"] || 0,
    });
   return rating
        .save()
        .then((data: any) => {
            
        console.log("Rating is created")
        console.log(data)
            return {statusCode:201, message: data };
        })
        .catch((err: { messge: string; }) => {
            return {statusCode:400,message:err.messge + "Bad request"}
        });
};
//Retrieve all ratings
export  const findAll = () => {
    return RatingSchema.find()
        .then((data: any) => {
            return data;    
        })
};
// Retrieve a rating
export const findOne = (ratingId: any) => {
    return RatingSchema.findById(ratingId)
        .then((data: any) => {
            if (data) {
                return data;
            }
            return {statusCode:404,message:"Request not found"}

        })
            
};
// Update rating
export const update = (ratingId: string,json: { [x: string]: any; }) => {
    //Validate Request
    if (!json["rating"]){
        return {message:"Not updated"}
    }
// Find rating and update it with ther request body
    return RatingSchema.findByIdAndUpdate(
            ratingId,
            {
            rating: json["rating"],
        },
        {
            new: true,
        }
    )
        .then((data: any) => {
            if (!data) {
                return {statusCode:400, message: "Bad request"};
            }
        return {statusCode:200,message:data}

        })
    };
// Delete a rating 
export const deleteRating = (ratingId:any) => {
    return RatingSchema.findByIdAndRemove(ratingId)
        .then((data: any) => {
            if (!data) {
                return { statusCode:404, message: "Not found"};
            }
            return {statusCode:201, message: "Rating deleted successfully"};
        });
};
