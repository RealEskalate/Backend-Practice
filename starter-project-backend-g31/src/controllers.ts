import RatingSchema from "./ratings";
// Create a rating instance
export const create = (json: { [x: string]: any; }) => {
    if (!json) {
        return {statusCode:400,message:"Bad request"}
    }
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
export const update = (req: any, res: any) => {
    //Validate Request
    if (!req.body.articleId) {
        return res.status(400).send({
            message: "Rating content can not be empty",
        });
    }
// Find rating and update it with ther request body
    RatingSchema.findByIdAndUpdate(
        req.params.ratingId,
        {
            articleId: req.body.articleId,
            userId: req.body.userId,
            rating: req.body.rating,
        },
        {
            new: true,
        }
    )
        .then((data: any) => {
            if (!data) {
                return res
                    .status(404)
                    .send({ message: "Rating not found with id " + req.params.ratingId });
            }
            res.send(data);
        })
        .catch((err: { kind: string }) => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Rating not found with id " + req.params.ratingId,
                });
            }
            return res.status(500).send({
                message: "Error updating with id " + req.params.ratingId,
            });
        });
};
// Delete a rating 
export const deleteRating = (req: any, res: any) => {
    RatingSchema.findByIdAndRemove(req.params.ratingId)
        .then((data: any) => {
            if (!data) {
                return res
                    .status(404)
                    .send({ message: "Rating not found with id " + req.params.ratingId });
            }
            res.send("Rating deleted successfully");
        })
        .catch((err: { kind: string }) => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Rating not found with id " + req.params.ratingId,
                });
            }
            return res.status(500).send({
                message: "Could not delete Rating with id " + req.params.ratingId,
            });
        });
};
