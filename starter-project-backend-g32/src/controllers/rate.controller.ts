import RateModel from "../models/Rate";
import ArticleModel from "../models/Article";
import { Request, Response } from "express";


// interface IGetUserAuthInfoRequest extends Request {
//   user: {
//     _id: string;
//   };
// }

// @desc      Create rates
// @route     POST /rates
// @route     POST /articles/:articleId/rates
// @access    Public
export const createRate = async (
  // req: IGetUserAuthInfoRequest, // will be done when authentication and authorization is implemented
  req: Request,
  res: Response
) => {
  try {
    req.body.article = req.params.articleId;
    // req.body.user = req.user._id;
    const article = await ArticleModel.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }
    const rate = await RateModel.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Rate created successfully",
      data: rate,
    });
  } catch (err: any) {
    return res
      .status(400)
      .json({
        message: err.message,
      })
      .end();
  }
};

// @desc      Get all rates
// @route     GET /rates
// @route     GET /articles/:articleID/rates
// @access    Public
export const getRates = async (req: Request, res: Response) => {
  if (req.params.postID) {
    try {
      const rates = await RateModel.find({});
      res.status(200).json({
        success: true,
        data: rates,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  } else {
    try {
      const rates = await RateModel.find({ article: req.params.articleID });
      res.status(200).json({
        success: true,
        data: rates,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};

// @desc      Get single rate
// @route     GET /rates/:rateId
// @access    Public
export const getRate = async (req: Request, res: Response) => {
  try {
    const rate = await RateModel.findById(req.params.rateID).populate({
      path: "article",
      select: "text",
    });
    if (!rate) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Rate not found with id " + req.params.rateID,
        })
        .end();
    }
    return res
      .status(200)
      .json({
        success: true,
        data: rate,
      })
      .end();
  } catch (err: any) {
    res
      .status(400)
      .json({
        success: false,
        message: err.message,
      })
      .end();
  }
};

// @desc      Update rate
// @route     PUT /api/v1/rates/:rateId
// @access    Private
export const updateRate = async (req: Request, res: Response) => {
  let rate = await RateModel.findById(req.params.rateId);
  if (!rate) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Rate not found with id " + req.params.rateId,
      })
      .end();
  }

  // if (rate.user.toString() !== req.user.id && req.user.role !== "admin") {
  //   return next(new ErrorResponse(`Not authorized to update rate`, 401));
  // }
  rate = await RateModel.findByIdAndUpdate(req.params.rateId, req.body, {
    new: true,
    runValidators: true,
  });
  rate?.save();
  return res
    .status(200)
    .json({
      success: true,
      data: rate,
    })
    .end();
};

// @desc      Delete rate
// @route     DELETE /api/v1/rate/:id
// @access    Private
export const deleteRate = async (req: Request, res: Response) => {
  let rate = await RateModel.findById(req.params.rateId);
  if (!rate) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Rate not found with id " + req.params.rateId,
      })
      .end();
  }

  // if (rate.user.toString() !== req.user.id && req.user.role !== "admin") {
  //   return next(new ErrorResponse(`Not authorized to delete rate`, 401));
  // }

  await RateModel.findByIdAndRemove(req.params.rateId);
  return res
    .status(200)
    .json({
      success: true,
      data: {},
    })
    .end();
}