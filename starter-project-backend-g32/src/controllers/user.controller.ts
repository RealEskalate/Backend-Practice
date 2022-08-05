import express, {Request, Response, NextFunction} from 'express'
import User from '../models/user.models';
import userModel from '../models/user.models';


export const getSpecificUser = async (req: Request, res: Response) => {
    try {
      const doc = await userModel.findOne({ _id: req.params.id }).lean().exec();
      const newDoc = {
        firstName: doc?.firstName,
        lastName: doc?.lastName,
        email: doc?.email,
        profilePic: doc?.profilePic,
      }
      if (!doc) {
        return res.status(404).end();
      }

      res.status(200).json({ data: newDoc });
    } catch (e) {
      res.status(404).end();
    }
};
export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const docs = await User.find().select('-password');
      
      res.status(200).json({ data: docs });
    } catch (e) {
      res.status(404).end();
    }
};
export const createUser = async (req: Request, res: Response) => {
    try {

      const doc = await userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.body.profilePic,
      });
      return res.status(200).json({data: doc});
    } catch (e) {
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
      res.status(500).end();
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
      res.status(500).end();
    }
};

