import express, { Router } from 'express';
import { getProfile, getProfiles , createProfile, updateProfile, deleteProfile } from "../controllers/profile.controller";

export const router: Router = express.Router();


router.get('/', getProfiles);
router.get('/:id', getProfile);
router.post('/', createProfile);
router.delete('/:id', deleteProfile);
router.patch('/:id', updateProfile);