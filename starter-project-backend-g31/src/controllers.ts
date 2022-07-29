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
