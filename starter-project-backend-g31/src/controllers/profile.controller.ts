import { Request, Response } from 'express';
import { profileDestructure } from '../helpers/profileHelpers';
import { Profile } from '../models/profileModel';


export async function getProfiles(req: Request, res: Response): Promise<void> {
    try {
        const profiles = await Profile.find({}).exec();
            res.status(200).json(profiles);
    } catch (err: any) {
        res.status(400).json({ message: 'Profiles not found' , error: err.toString()});
    }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    try {
        const profile = await Profile.findById({ _id: id });
        if (profile) {
         res.status(200).json(profile);   
        } else {
            throw Error(`Couldn't find profile with id: ${id}`);
        } 
    } catch (err: any) {
        res.status(400).json({message: 'unable to get profile', error: err.toString() });
    }
}

export async function createProfile(req: Request, res: Response): Promise<void> {
    try {
        const body = profileDestructure(req.body)
        const profile = await Profile.create(body);
        res.status(201).json(profile);
    } catch (err: any) {
        res.status(400).json({message: 'unable to create profile', error: err.toString() });
    }
}


export async function updateProfile(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    try {
        const body = profileDestructure(req.body)
        const profile = await Profile.findById({ _id: id }).exec();
        if (!profile) throw Error(`User with Id: ${id} doesn't exist`);

        profile.set(body);
        profile.save();
        res.status(200).json(profile);
    } catch (err: any) {
        res.status(400).json({message: 'unable to update profile', error: err.toString() });
    }
}


export async function deleteProfile(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    try {
        const profile = await Profile.findByIdAndDelete({ _id: id });
        res.status(204).json();
    } catch (err: any) {
        res.status(400).json({message: 'unable to delete profile', error: err.toString() });
    }
}