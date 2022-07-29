import RatingSchema from "./ratings";
// Create a rating instance
export const create = (json: { [x: string]: any; }) => {
   
    const rating = new RatingSchema({
        articleId: json["articleId"],
        userId: json["userId"],
        rating: json["rating"] || 0,
    });
   return rating
        .save()
        .then((data) => {
        console.log("Rating is created")
        console.log(data)
            return data;
        })
        .catch((err) => {
            return {statusCode:500,message:"Some error occurred"}
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
                return { message: "Rating not found with id "+ratingId};
            }
        return data

        })
    };
// Delete a rating 
export const deleteRating = (ratingId:any) => {
    return RatingSchema.findByIdAndRemove(ratingId)
        .then((data: any) => {
            if (!data) {
                return { message: "Rating not found with id " + ratingId };
            }
            return {message: "Rating deleted successfully"};
        });
};
