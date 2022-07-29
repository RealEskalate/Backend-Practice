import { Router, Request, Response } from 'express';
import { findOne, findMany, create , update, _delete } from '../services/profileService';


export async function getProfiles(req: Request, res: Response): Promise<void> {
    try {
        await findMany().then(profiles => {
            res.status(200).json(profiles);
        })   
    } catch (err) {
        res.status(400).json({ error: 'Profiles not found' });
    }
}

export async function getProfile(req: any, res: any): Promise<void> {
    var id = req.params.id;
    try {
        await findOne(id).then(profile => { 
            res.status(200).json(profile);
        })   
    } catch (err) {
        res.status(400).json({ error: 'Profile not found' });
    }
}

export async function createProfile(req: any, res: any): Promise<void> {

    console.log(`The body is ${req.body}`);
    try {
        await create(req.body).then(profile => { 
            res.status(201).json(profile);
        })   
    } catch (err) {
        res.status(400).json({ error: 'unable to create Profile' });
    }
}


export async function updateProfile(req: any, res: any): Promise<void> {
    var id = req.params.id;
    try {
        await update(id, req.body).then(profile => { 
            res.status(200).json(profile);
        })   
    } catch (err) {
        res.status(400).json({ error: 'Profile not updated' });
    }
}


export async function deleteProfile(req: any, res: any): Promise<void> {
    var id = req.params.id;
    try {
        await _delete(id).then(profile => { 
            res.status(204);
        })   
    } catch (err) {
        res.status(400).json({ error: 'Profile not deleted' });
    }
}