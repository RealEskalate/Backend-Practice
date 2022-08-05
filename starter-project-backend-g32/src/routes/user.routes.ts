import Express,{Router} from "express";
import { getUsers , createUser , updateUser, deleteUser , getUserByUsername , getUserById , validateToken , login } from "../controllers/user";
import {extractJWT} from "../middlewares/extractJWT"
export const Userrouter: Router = Express.Router()

Userrouter.get("/validate" ,extractJWT,validateToken )
Userrouter.post("/login" , login)
Userrouter.get("/",getUsers)
Userrouter.get("/username/:username", getUserByUsername)
Userrouter.get("/userId/:id", getUserById)
Userrouter.post("/", createUser)
Userrouter.delete("/:id", deleteUser)
Userrouter.patch("/:id", updateUser)