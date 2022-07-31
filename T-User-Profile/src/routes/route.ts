import Express,{Router} from "express";
import { getUserProfile, createUserProfile, deleteUser, updateById } from "../controllers/userProfile"


export const router: Router = Express.Router()

router.get("/", getUserProfile)
router.post("", createUserProfile)
router.delete("/:id", deleteUser)
router.patch("/:id", updateById)
