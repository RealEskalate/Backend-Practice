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
            
            return {statusCode:201, message: data };
        })
        .catch(() => {
            return {statusCode:400,message:"Bad request"}
        });
};
//Retrieve all ratings
export  const findAll = () => {
    return RatingSchema.find()
        .then((data: any) => {
            return {statusCode:200,message:data};    
        }).catch(() => {
            return {statusCode:404,message:"Not Found"}
        });

};
// Retrieve a rating
export const findOne = (ratingId: any) => {
    return RatingSchema.findById(ratingId)
        .then((data: any) => {
            return {statusCode:200,message:data};
            
        })
        .catch(()=>{
             return {statusCode:404,message:"Not Found"}

        });
}

            
// Update rating
export const update = (ratingId: string,json: { [x: string]: any; }) => {
    //Validate Request
    if (!json["rating"]){
        return {statusCode:400,message: "Bad request"}
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
            
            return {statusCode:200, message: data};
            })
            .catch(() => {
                return {statusCode:400,message:"Bad request"}
            });
    

        };
// Delete a rating 
export const deleteRating = (ratingId:any) => {
    return RatingSchema.findByIdAndRemove(ratingId)
        .then((data: any) => {
            return {statusCode:201, message: "Rating deleted successfully"};
        }).catch(()=>{
        return { statusCode:404, message: "Not found"};
    
            });
            };
