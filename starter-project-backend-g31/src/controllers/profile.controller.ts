import { Router, Request, Response } from 'express';
import { findOne, findMany, create, update, _delete } from '../services/profileService';
import { profileDestructure } from '../helpers/profileHelpers';


export async function getProfiles(req: Request, res: Response): Promise<void> {
    try {
        await findMany().then(profiles => {
            res.status(200).json(profiles);
        })   
    } catch (err: any) {
        res.status(400).json({ message: 'Profiles not found' , error: err.toString()});
    }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    try {
        await findOne(id).then(profile => { 
            res.status(200).json(profile);
        })   
    } catch (err: any) {
        res.status(400).json({message: 'unable to get profile', error: err.toString() });
    }
}

export async function createProfile(req: Request, res: Response): Promise<void> {
    try {
        const body = profileDestructure(req.body)
        await create(body).then(profile => { 
            res.status(201).json(profile);
        })   
    } catch (err: any) {
        res.status(400).json({message: 'unable to create profile', error: err.toString() });
    }
}


export async function updateProfile(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    try {
        const body = profileDestructure(req.body)
        await update(id, body).then(profile => { 
            res.status(200).json(profile);
        })   
    } catch (err: any) {
        res.status(400).json({message: 'unable to update profile', error: err.toString() });
    }
}


export async function deleteProfile(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    try {
        await _delete(id).then(() => {
            res.status(204).json();
        })   
    } catch (err: any) {
        res.status(400).json({message: 'unable to delete profile', error: err.toString() });
    }
}