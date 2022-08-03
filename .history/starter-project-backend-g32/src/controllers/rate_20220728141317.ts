import RateModel from "../models/Rate";
import { Request, Response, NextFunction } from "express";

// @desc      Get all rates
// @route     GET /users/:userID/posts/:postID/rates
// @access    Public
export const createRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rate = await RateModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Rate created successfully",
      data: rate,
    });
  } catch (err) {
    next(err);
  }
}

// @desc      Get all rates
// @route     GET /users/:userID/posts/:postID/rates
// @access    Public
export const getRates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rates = await RateModel.find({});
    res.status(200).json({
      success: true,
      data: rates,
    });
  } catch (err) {
    next(err);
  }
}
