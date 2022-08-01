import {Request, Response} from "express"

import { Model, Mongoose, Schema } from "mongoose"
import {User} from "../models/User.model";
import bcrypt from "bcrypt";

const SaltRound = 10
 
export const getUsers = async function(req : Request , res : Response) {

    try {
        const users = await User.find();
        res.json(users);
    }catch (e) {
        console.log(e);
    }
};

export const createUser = async function(req : Request , res : Response) {
    try {
    const user = new User(req.body);
    console.log(user);
    user.save();
    res.json(user);
 } catch (e) {
    res.json(e)
    console.log(e);
    }
};

export const updateUser = async function(req : Request , res : Response) {
    try {

        const user = req.body;
        const id = req.params.id;

        const updated = await User.updateOne({ _id : id } , {$set : user});
        res.json(user);



    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

export const deleteUser = async function(req : Request , res : Response) {
    try {

        const user = User.findById({_id : req.params.id});
        const id = req.params.id;

        const updated = await User.deleteOne({ _id : id });
        res.json(user);



    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

