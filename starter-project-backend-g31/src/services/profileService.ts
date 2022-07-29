// import Profile from '../models/profileModel';
import { AnyCnameRecord } from 'dns';
import { Profile } from '../models/profileModel';
import { Request } from 'express';
import { Model, Schema } from 'mongoose';
import assert from 'assert';


export const findOne = async(id: string): Promise<any> => {
    try {
        const profile = await Profile.findById({ _id: id });
        if (profile) {
         return profile;   
        } else {
            throw Error(`Couldn't find profile with id: ${id}`);
        }
    } catch (err) {
        throw Error(`Couldn't find profile with id: ${id}`);
    }
}

export const findMany = async(): Promise<any> => {
    try {
        const profile = await Profile.find({});
        return profile;
    } catch (err) {
        throw Error(`Couldn't find profiles`);
    }
}

export const create = async(body: any): Promise<any> => {
    try {

        const profile = new Profile(body);
        profile.save();
        return profile;
    } catch (err) {
        throw Error(`Couldn't create profile`);
    }
}


export const update = async (id: string, body: any): Promise<any> => {
    try {
        const profile = await Profile.findById({ _id: id });
        if (!profile) throw Error(`User with Id: ${id} doesn't exist`);

        profile.set(body);
        profile.save();
        return profile;
    } catch (err) {
        throw Error(`Couldn't update profile with id: ${id}`);
    }
}

export const _delete = async(id: string): Promise<any> => {
    try {
        const profile = await Profile.findByIdAndDelete({ _id: id });
        return profile;
    } catch (err) {
        throw Error(`Couldn't delete profile with id: ${id}`);
    }
}