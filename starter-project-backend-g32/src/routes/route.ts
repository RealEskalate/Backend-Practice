import Express,{Router} from "express";
import {getUserById, createUserProfile,getUserProfile, deleteUser, updateById } from "../controllers/userProfile"

const router = Express.Router()

router.get("/", getUserProfile)

router.get("/:id", getUserById)
router.post("", createUserProfile)
router.delete("/:id", deleteUser)
router.put("/:id", updateById)

export default router;