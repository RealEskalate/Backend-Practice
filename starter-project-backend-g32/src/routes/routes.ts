import Express,{Router} from "express";
// import { getProfile,updateProfile, deleteProfile, createProfile } from "../controllers/userProfileControllers"
import { getUsers , createUser , updateUser, deleteUser , getUserByUsername , getUserById , validateToken , login } from "../controllers/user.Controller";
import {extractJWT} from "../middlewares/extractJWT"
export const router: Router = Express.Router()

router.get("/validate" ,extractJWT,validateToken )
router.post("/login" , login)
router.get("/",getUsers)
router.get("/username/:username", getUserByUsername)
router.get("/userId/:id", getUserById)
router.post("/", createUser)
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)