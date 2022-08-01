import Express,{Router} from "express";
// import { getProfile,updateProfile, deleteProfile, createProfile } from "../controllers/userProfileControllers"
import { getUsers , createUser , updateUser, deleteUser } from "../controllers/user.Controller";

export const router: Router = Express.Router()

router.get("/", getUsers)

router.post("/", createUser)
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)