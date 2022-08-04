import { Rating } from "../models/rating";
import {addRatingToArticle, updateRatingForArticle} from "./article"

export const getAllRatings = (req: any, res: any) => {
  return Rating.find({})
    .then((ratings: any) => res.send(ratings))
    .catch((error: any) => res.status(404).send(error));
};

export const getSingleRating = async (req: any, res: any) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (rating) return res.send(rating)
    return res.status(404).send("cannot get rating");
  } catch (error) {
    return res.status(404).send("cannot get rating");
  }
};
export const getAllRatingsForAGivenArticle = async (req: any, res: any) => {
  try {
    const ratings = await Rating.find({ articleID: req.params.articleID })
    if (ratings.length > 0) return res.send(ratings);
    return res.status(404).send("Ratings not found");
  }
  catch (error) {
    res.status(404).send("Ratings not found")
  }
} 
export const getAllRatingsForAGivenUser = async (req: any, res: any) => {
  try {
    const ratings = await Rating.find({ userID: req.params.userID })
    if (ratings.length > 0) return res.send(ratings);
    return res.status(404).send("Ratings not found");
  }
  catch (error) {
    return res.status(404).send("Ratings not found")
  }
}
export const getAllRatingsForAGivenArticleAndUser = async (req: any, res: any) => {
  try {
    const ratings = await Rating.find({ articleID: req.params.articleID, userID: req.params.userID })
    if (ratings.length > 0) return res.send(ratings);
    return res.status(404).send("Ratings not found");
  }
  catch (error) {
    return res.status(404).send("Ratings not found")
  }
}


export const createRating = async (req: any, res: any) => {
  try {
    const ratedBefore = await Rating.findOne({ articleID: req.body.articleID, userID: req.body.userID });
    if (ratedBefore) {
      await updateRatingForArticle(ratedBefore.articleID, ratedBefore.rating, req.body.rating)
      ratedBefore.rating = req.body.rating
      await ratedBefore.save()
      return res.send(ratedBefore)
    }
    let newRating = new Rating({
      articleID: req.body.articleID,
      userID: req.body.userID,
      rating: req.body.rating,
    });
    await newRating.save();
    await addRatingToArticle(newRating.articleID, newRating.rating)

    return res.status(201).send(newRating)
  }
	catch (error) {
    res.status(400).send("error");
  }
}

export const updateRating = async (req: any, res: any) => {
  try {
    const rating = await Rating.findById({ _id: req.params.id })
    if (!rating) return res.status(404).send("Rating not found to be updated")
    await updateRatingForArticle(rating.articleID, rating.rating, req.body.rating)
    rating.rating = req.body.rating || rating.rating;
    await rating.save()
    return res.send(rating)
  } catch (er) {
    return res.status(404).send("Please enter a valid ID")
  }

};

export const deleteRating = async (req: any, res: any) => {
  try {
    const rating = await Rating.find({ _id: req.params.id })
    if (!rating) return res.status(404).send("Rating not found to be deleted")
    const deleteSuccess = await Rating.deleteOne({ _id: req.params.id })
    if (!deleteSuccess) return res.status(500).send("Cannot delete rating")
    return res.send(rating)
  }
  catch (e) { 
    return res.status(404).send("Please enter a valid id")
  }

};
