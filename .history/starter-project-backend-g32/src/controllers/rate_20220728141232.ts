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
      data: rate,
    });
  } catch (err) {
    next(err);
  }
}


