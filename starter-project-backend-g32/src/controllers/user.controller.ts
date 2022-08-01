import express, {Request, Response, NextFunction} from 'express'
import userModel from '../models/user.models';


export const getSpecificUser = async (req: Request, res: Response) => {
    try {
      const doc = await userModel.findOne({ _id: req.params.id }).lean().exec();

      if (!doc) {
        return res.status(404).end();
      }

      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(404).end();
    }
};
export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const docs = await userModel.find().lean().exec();
      res.status(200).json({ data: docs });
    } catch (e) {
      console.error(e);
      res.status(404).end();
    }
};
export const createUser = async (req: Request, res: Response) => {
    try {
      const doc = await userModel.create({ ...req.body });
      return res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(404).end();
    }
};
export const updateUser = async (req: Request, res: Response) => {
    try {
      const updateDoc = await userModel
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          {
            new: true,
          }
        )
        .lean()
        .exec();

      if (!updateDoc) {
        return res.status(404).end();
      }
      res.status(200).json({ data: updateDoc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
};
export const removeUser = async (req: Request, res: Response) => {
    try {
      const removed = await userModel.findOneAndRemove({
        _id: req.params.id,
      });
      if (!removed) {
        return res.status(404).end();
      }
      return res.status(200).json({ data: removed });
    } catch (e) {
      console.error(e);
      res.status(404).end();
    }
};

