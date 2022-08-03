import Express,{Router} from "express";
import { getProfileHandler, createProfileHandler, deleteProfileHandler, updateProfileHandler, getProfilesHandler } from "../controllers/userProfile"


export const router: Router = Express.Router()

router.get("/:id", getProfileHandler)
router.get("", getProfilesHandler)
router.post("", createProfileHandler)
router.delete("/:id", deleteProfileHandler)
router.patch("/:id", updateProfileHandler) 
