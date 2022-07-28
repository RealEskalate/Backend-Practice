import { Rating, validate } from "../models/rating";

export const getAllRatings = () => {
  return Rating.find({})
    .then((ratings: any) => ({ statusCode: 200, ratings: ratings }))
    .catch((error: any) => ({ statusCode: 404, error: error }));
};

export const getSingleRating = async (id: string) => {
  try {
    const rating = await Rating.findById(id);
    if (rating) return ({ statusCode: 200, rating: rating })
    return ({ statusCode: 404, error: "Cannot get rating" });
  }catch(error) {
    return ({ statusCode: 404, error: "Cannot get rating" });
  }
    
};

export const createRating = async (rating: any) => {
  const { error } = validate(rating);
  if (error) return ({ statusCode: 400, error: error.details[0].message })
  let newRating = new Rating({
    articleID: rating.articleID,
    userID: rating.userID,
    rating: rating.rating,
  });
  await newRating.save();
  return ({ statusCode: 201, rating: rating })
};

export const updateRating = async (id: string, updated: any) => {
  const rating = await Rating.findById({ _id: id })
  if (!rating) return ({ statusCode: 404, error: "Rating not found" })
  rating.rating = updated.rating || rating.rating;
  await rating.save()
  return ({ statusCode: 200, rating: rating })
};

export const deleteRating = async (id: string) => {
  const rating = await Rating.find({ _id: id })
  if (!rating) return ({ statusCode: 404, error: "Rating not found to be deleted" })
  const deleteSuccess = await Rating.deleteOne({ _id: id })
  if (!deleteSuccess) return ({ statusCode: 500, error: "Cannot delete Rating" })
  return ({ statusCode: 200, rating: rating })
};
