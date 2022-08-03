import jwt from 'jsonwebtoken';
import config from '../config/config';
import IUser from '../interfaces/user.interface';

export const signJWT = (user: IUser, callback: (error: Error | null | unknown, token: string | null) => void): void => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);


    try {
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    console.log("token error")
                    callback(error, null);
                } else if (token) {
                    console.log("token given")
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        
        console.log(error);
        callback(error , null);
    }
};