const { Console } = require("console");

const Article = require("../models/article").default;
const stars_arr = ["one", "two", "three", "four", "five"];


const getOne = (model) => async (req, res) => {
    try {
      const doc = await model.findOne({ _id: req.params.id }).lean().exec();
  
      if (!doc) {
        return res.status(404).end();
      }
  
      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  const getMany = (model) => async (req, res) => {
    try {
      const docs = await model.find().lean().exec();
      
      res.status(200).json({ data: docs });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  const createOne = (model) => async (req, res) => {
    try {
        //get the rating information from the req body
        const rating = req.body;
        const articleId = rating.article;
        const stars = stars_arr[rating.stars -1];

        //get the article to be rated
        try {
            const doc = await Article.findOne({ _id: articleId }).lean().exec()
            if (!doc) {
                //retutn 400 cuz it's a bad request
                return res.status(400).end()
            }
            //Update the rating info
            const articleRating = doc.rating;
            articleRating[stars] = articleRating[stars] +1;
            //Save the update using put
            await Article.findOneAndUpdate(
                {
                    _id: articleId,
                },
                {
                    rating: {...articleRating}
                }
                ,
                { new: true }
                ).lean().exec()

        } catch (e) {
          return res.status(400).end()
        }

      const ratingDoc = await model.create({ ...req.body });
      res.status(201).json({ data: ratingDoc });
    } catch (e) {
      console.error(e);
      return res.status(400).end();
    }
  };
  
  const updateOne = (model) => async (req, res) => {
    try {

      //find the rating and extract old stars value
      const rating = await model.findOne({ _id: req.params.id }).lean().exec();
      const old_star = stars_arr[rating.stars -1];

      //find the respective article and decrement the old value
      const articleId = rating.article;
      const articleDoc = await Article.findOne({ _id: articleId }).lean().exec()
      const articleRating = articleDoc.rating;
      articleRating[old_star] -= 1;

      //increment the new value and update article
      const new_star = stars_arr[req.body.stars -1];
      articleRating[new_star] += 1;
      await Article.findOneAndUpdate(
        {
            _id: articleId,
        },
        {
          rating: {...articleRating}
        },
        { new: true }
        ).lean().exec()

      //update the rating as well
      const updatedDoc = await model
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          { new: true }
        )
        .lean()
        .exec();
  
      if (!updatedDoc) {
        return res.status(404).end();
      }
  
      res.status(200).json({ data: updatedDoc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  const removeOne = (model) => async (req, res) => {
    try {
      const removed = await model.findOneAndRemove({
        _id: req.params.id,
      });
  
      if (!removed) {
        return res.status(404).end();
      }
  
      return res.status(200).json({ data: removed });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  const crudControllers = (model) => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
  });
  
  module.exports = { crudControllers };