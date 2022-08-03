import RateModel from "../models/Rate";
import { Request, Response } from "express";

// @desc      Get all rates
// @route     GET /users/:userID/posts/:postID/rates
// @access    Public
export const createRate = async (req: Request, res: Response) => {
  try {
    const rate = await RateModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Rate created successfully",
      data: rate,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
};

// @desc      Get all rates
// @route     GET /users/:userID/posts/:postID/rates
// @access    Public
export const getRates = async (req: Request, res: Response) => {
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
};

// @desc      Get rate
// @route     GET /users/:userID/posts/:postID/rates/:rateID
// @access    Public
export const getRate = async (req: Request, res: Response) => {
  try {
    const rate = await RateModel.findById(req.params.rateID);
    res.status(200).json({
      success: true,
      data: rate,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// @desc      Update rate
// @route     PUT /users/:userID/posts/:postID/rates/:rateID
// @access    Public
export const updateRate = async (req: Request, res: Response) => {
  
}
