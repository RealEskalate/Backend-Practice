import { Rating, validate } from "../models/rating";

export const getAllRatings = () => {
  return Rating.find({})
    .then((ratings: any) => ({ statusCode: 200, body: ratings }))
    .catch((error: any) => ({ statusCode: 404, body: error }));
};

export const getSingleRating = async (id: string) => {
  try {
    const rating = await Rating.findById(id);
    if (rating) return ({ statusCode: 200, body: rating })
    return ({ statusCode: 404, body: "Cannot get rating" });
  } catch (error) {
    return ({ statusCode: 404, body: "Cannot get rating" });
  }

};
export const getAllRatingsForAGivenArticle = async (articleID: string) => {
  try {
    const ratings = await Rating.find({ articleID: articleID })
    if (ratings.length > 0) return {
      statusCode: 200,
      body: ratings
    };
    return {
      statusCode: 404,
      body: "Ratings not found"
    };
  }
  catch (error) {
    return {
      statusCode: 404,
      body: "Article not found"
    }
  }
}
export const getAllRatingsForAGivenUser = async (userID: string) => {
  try {
    const ratings = await Rating.find({ userID: userID })
    if (ratings.length > 0) return {
      statusCode: 200,
      body: ratings
    };
    return {
      statusCode: 404,
      body: "Ratings not found"
    };
  }
  catch (error) {
    return {
      statusCode: 404,
      body: "Article not found"
    }
  }
}
export const getAllRatingsForAGivenArticleAndUser = async (articleID: string, userID: string) => {
  try {
    const ratings = await Rating.find({ articleID: articleID, userID: userID })
    if (ratings.length > 0) return {
      statusCode: 200,
      body: ratings
    };
    return {
      statusCode: 404,
      body: "Ratings not found"
    };
  }
  catch (error) {
    return {
      statusCode: 404,
      body: "Article not found"
    }
  }
}


export const createRating = async (rating: any) => {
  const { error } = validate(rating);
  if (error) return ({ statusCode: 400, body: error.details[0].message })
  const ratedBefore = await Rating.findOne({ articleID: rating.articleID, userID: rating.userID });
  if (ratedBefore) {
    ratedBefore.rating = rating.rating
    await ratedBefore.save()
    return ({ statusCode: 200, body: rating })
  }
  let newRating = new Rating({
    articleID: rating.articleID,
    userID: rating.userID,
    rating: rating.rating,
  });
  await newRating.save();
  return ({ statusCode: 201, body: rating })
};

export const updateRating = async (id: string, updated: any) => {
  try {
    const rating = await Rating.findById({ _id: id })
    if (!rating) return ({ statusCode: 404, body: "Rating not found" })
    rating.rating = updated.rating || rating.rating;
    await rating.save()
    return ({ statusCode: 200, body: rating })
  } catch (er) {
    return ({ statusCode: 404, body: "Please enter valid id" })
  }

};

export const deleteRating = async (id: string) => {
  try {
    const rating = await Rating.find({ _id: id })
    if (!rating) return ({ statusCode: 404, body: "Rating not found to be deleted" })
    const deleteSuccess = await Rating.deleteOne({ _id: id })
    if (!deleteSuccess) return ({ statusCode: 500, body: "Cannot delete Rating" })
    return ({ statusCode: 200, body: rating })
  }
  catch (e) {
    return ({ statusCode: 404, body: "Please enter a valid id" })
  }

};
