import UserProfile from "../models/UserProfile";
import { Request, Response } from "express";

interface IResponse {
    success: boolean,
    message: any,
    data?: any
};


const response = (res: IResponse): IResponse => res;


// Create a new user profile
export const createUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await UserProfile.create(req.body);

        res.status(201).json(response(
            {
                success: true,
                message: "UserProfile created successfully",
                data: userProfile
            }
        ));

    } catch (e: any) {
        res.status(500).json(response(
            {
                success: false,
                message: e.message,
            }
        ));
    }
}

// Get all user profiles
export const getUserProfiles = async (req: Request, res: Response) => {
    try {
        const userProfiles = await UserProfile.find();
        res.status(200).json(response(
            {
                success: true,
                message: "UserProfiles retrieved successfully",
                data: userProfiles
            }
        ));

    } catch (e: any) {
        res.status(500).json(response(
            {
                success: false,
                message: e.message
            }
        ));
    }
}


// Get User Profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await UserProfile.findById(req.params.userID)
        if (!userProfile) {
            res.status(404).json(response(
                {
                    success: false,
                    message: "UserProfile not found."
                }
            ));
            return;
        }
        res.status(200).json(response(
            {
                success: true,
                message: "UserProfile retrieved successfully.",
                data: userProfile
            }
        ));

    } catch (e: any) {
        res.status(500).json(response(
            {
                success: false,
                message: e.message
            }
        ));
    }
}


// Update a user profile
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await UserProfile.findByIdAndUpdate(req.params.userID, req.body, { new: true });
        if (!userProfile) {
            res.status(404).json(response(
                {
                    success: false,
                    message: "UserProfile not found."
                }
            ));
            return;
        }
        res.status(200).json(response(
            {
                success: true,
                message: "UserProfile updated successfully",
                data: userProfile,
            }
        ));
    } catch (e: any) {
        res.status(500).json(response(
            {
                success: false,
                message: e.message,
            }
        ))
    }
}

// Delete a user profile
export const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.userID);
        if (!userProfile) {
            res.status(404).json(response(
                {
                    success: false,
                    message: "UserProfile not found."
                }
            ));
            return;
        }
        res.status(200).json(response(
            {
                success: true,
                message: "UserProfile deleted successfully",
                data: userProfile,
            }
        ));
    } catch (e: any) {
        res.status(500).json(response(
            {
                success: false,
                message: e.message,
            }
        ))
    }
}
