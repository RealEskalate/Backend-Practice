import jwt, { JwtPayload }  from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User  from '../models/user.models';
import { compareSync } from 'bcrypt';

const secret = 'secret';
export const login = async (req: Request, res: Response ) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).end();
        }
        
        const isValid = await compareSync(req.body.password, user.password);
        if (!isValid) {
            return res.status(404).end();
        }
        const token = jwt.sign({ id: user._id.toString() }, secret , { expiresIn: '15d' });
        
        res.cookie('token', token);
        res.status(200).json({ token });
    } catch (e) {
        res.status(404).end();
    }
}
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.cookie?.toString().split('=')[1];
        if (!token) {
            return res.status(401).end();
        }
        const decoded = jwt.verify(token, secret);
        const user = await User.findById((decoded as JwtPayload).id);
        if (!user) {
            return res.status(401).end();
        }
        res.locals.userId = user._id;
        next();

    } catch (e) {
        return res.status(401).end();
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).end();
}