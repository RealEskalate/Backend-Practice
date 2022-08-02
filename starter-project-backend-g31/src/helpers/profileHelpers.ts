import { ProfileSchema } from '../models/profileModel';

export function profileDestructure(body: any): ProfileSchema {
    const { username, fullname, bio, phone, avatar } = body;
    var profile = { username, fullname, bio, phone, avatar }

    if (!fullname) {
        delete profile.fullname
    }
    if (!bio) {
        delete profile.bio
    }
    if (!phone) {
        delete profile.phone
    }
    if (!avatar) {
        delete profile.avatar
    }
    return profile
};