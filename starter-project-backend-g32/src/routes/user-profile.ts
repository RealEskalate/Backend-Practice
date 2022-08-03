import { Router } from "express";
import {
    getUserProfiles,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
} from "../controllers/user-profile";

const router = Router();

router.route("/").get(getUserProfiles); // Get users profile
router.route("/").post(createUserProfile); // Create user profile

router.route("/:userID").get(getUserProfile); // Get single user profile 
router.route("/:userID").put(updateUserProfile); // Update user profile
router.route("/:userID").delete(deleteUserProfile); // Delete user profile

export default router;
