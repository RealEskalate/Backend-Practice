import Express,{Router} from "express";
import { getProfileHandler, createProfileHandler, deleteProfileHandler, updateProfileHandler } from "../controllers/userProfileControllers"


export const router: Router = Express.Router()

router.get("/:id", getProfileHandler)
router.post("", createProfileHandler)
router.delete("/:id", deleteProfileHandler)
router.patch("/:id", updateProfileHandler)
