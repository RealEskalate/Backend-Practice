import {Request, Response , NextFunction} from "express"
import {User} from "../models/User.model";
import bcrypt from "bcrypt";
import { signJWT } from "../functions/signJWT";


const saltRounds  = 10;
 
export const getUsers = async function(req : Request , res : Response) {

    try {
        const users = await User.find();
        res.json(users);
    }catch (e) {
        res.status(404)
        console.log(e);
    }
};

export const getUserByUsername = async function(req: Request , res : Response) {
    console.log(req.params.username)
    try {
        
        const user = await User.findOne({username : req.params.username})
        res.status(200).json(user)
    } catch (err) {

        console.log(err);
        res.status(400).json(err)
    }
}

export const getUserById = async function(req: Request , res : Response) {

    try {

        const user = await User.findOne({_id : req.params.id})
        res.status(200).json(user)
    } catch (err) {

        console.log(err);
        res.status(400).json(err)
    }
}


export const createUser = async function(req : Request , res : Response) {
  
    const plainPassword = req.body.password
    bcrypt.hash(plainPassword, saltRounds, async function(err, hash) {
        if (err) {
            return res.status(400).json({message: err.message})
        }
        try {

        const user = await User.create({username: req.body.username , password: hash});
        console.log(user);
        user.save();
        res.status(201).json(user);

        } catch (e) {
        res.status(400).json(e)
        console.log(e);
        }
    });
    
 
};

//This verifies User given the Username and password
// export const login = async function(req : Request , res: Response) {
//     const plainPassword = req.body.password
//     const username = req.body.username
//     try {
//         const user = await User.findOne({username : username});
//         bcrypt.compare(plainPassword, user.password, function(err, result) {

            
//         });

//     }
    

// };

export const updateUser = async function(req : Request , res : Response) {
    try {
        const user = req.body;
        const id = req.params.id;

        const updated = await User.updateOne({ _id : id } , {$set : user});
        res.status(200).json(user);

    } catch (err) {
        res.status(400).json(err);
        
        console.log(err);
    }
}

export const deleteUser = async function(req : Request , res : Response) {
    try {

     
        const id = req.params.id;

        const updated = await User.findByIdAndDelete({ _id : id });
        res.status(200).json(updated);

    } catch (err) {
        res.status(400).json({message : err});
        console.log(err);
    }
}


export const validateToken = (req : Request , res : Response , next : NextFunction) => {
    return res.status(200).json({
        message : "Token is validated"
    })
}

export const login = async (req : Request , res : Response , next : NextFunction) => {
    console.log("logging in ...")
    let {username , password} = req.body;
    try{
        const user = await User.find({username});
        console.log("trying login")
    if (user.length > 1 || !user){
        console.log("err not found")
        return res.status(404).json({message : "Unauthorized!"});
    } else {
        
         bcrypt.compare(password, user[0].password, (error, result) => {
            console.log()
            if (error) {
               
                console.log("login error")
                return res.status(500).json({
                    message: error.message,
                    error: error

            });} else if (result) {
                console.log(`result is ${result}`)
                signJWT(user[0] , (error , token) => {
                    if (error) {
                        return res.status(500).json({
                                message: error,
                               
                            });
                    } else if (token) {
                        return res.status(200).json({
                            message : "Authoriazation successful",
                            token : token,
                            user : user[0]
                        })
                    }
                })
            }
            else {
                return res.status(400).json({
                                message: "Password or username Incorrect",
                            });

            }
            
         }
         )
    }
    } catch (err) {
        res.status(400).json({message :"Password or username Incorrect" });
        console.log(err);
    }
    


}