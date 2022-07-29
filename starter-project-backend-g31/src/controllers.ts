import RatingSchema from "./ratings";
// Create a rating instance
export const create = (req: any, res: any) => {
    if (!req.body.articleId) {
        return res.status(400).send({
            message: `Rating content can not be empty ${req.body.content}`,
        });
    }
    const rating = new RatingSchema({
        articleId: req.body.articleId,
        userId: req.body.userId,
        rating: req.body.rating || 0,
    });
    rating
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Rating",
            });
        });
};
//Retrieve all ratings
export  const findAll = (req: any, res: any) => {
    RatingSchema.find()
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: { message: any }) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data",
            });
        });
};
// Retrieve a rating
export const findOne = (req: any, res: any) => {
    RatingSchema.findById(req.params.ratingId)
        .then((data: any) => {
            if (!data) {
                return res.status(504).send({
                    message: `Rating not found on user Id ${req.params.ratingId}`,
                });
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
                message: "Error retrieving Rating with id " + req.params.ratingId,
            });
        });
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
