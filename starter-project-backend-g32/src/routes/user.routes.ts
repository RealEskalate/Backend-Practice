import express from 'express';
const router = express.Router();
import {getSpecificUser, getAllUsers, createUser, updateUser, removeUser} from '../controllers/user.controller'

router.route("/:id").get(getSpecificUser);
router.route("/").get(getAllUsers);
router.route("/").post(createUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(removeUser);

export default router;
