import ArticleModel from "../models/Article";
import { Request, Response } from "express";

// @desc      Get all articles
// @route     GET /articles
// @route     GET /articles
// @access    Public
export const getArticles = async (req: Request, res: Response) => {
  if (req.params.postID) {
    try {
      const articles = await ArticleModel.find({});
      res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  } else {
    try {
      const articles = await ArticleModel.find({
        article: req.params.articleID,
      });
      res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};

// @desc      Get article
// @route     GET /articles/:articleId
// @access    Public
export const getArticle = async (req: Request, res: Response) => {
  try {
    const article = await ArticleModel.findById(req.params.articleID);
    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({
        message: err.message,
      })
      .end();
  }
};

// @desc      Create articles
// @route     POST /articles
// @route     POST /articles
// @access    Public

export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = await ArticleModel.create(req.body);
    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({
        message: err.message,
      })
      .end();
  }
};
