import Express,{Router} from "express";
import { getProfileHandler, createProfileHandler, deleteProfileHandler, updateProfileHandler, getProfilesHandler } from "../controllers/userProfile"
import  upload  from '../utils/multer'

export const router: Router = Express.Router()

router.get("/:id", getProfileHandler)
router.get("", getProfilesHandler)
router.post("",upload.single('avatar'), createProfileHandler)
router.delete("/:id", deleteProfileHandler)
router.patch("/:id", upload.single('avatar'),updateProfileHandler) 
