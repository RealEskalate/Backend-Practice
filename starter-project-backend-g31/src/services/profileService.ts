import { Profile } from '../models/profileModel';

export const findOne = async(id: string) => {
        const profile = await Profile.findById({ _id: id });
        if (profile) {
         return profile;   
        } else {
            throw Error(`Couldn't find profile with id: ${id}`);
        }
}

export const findMany = async(): Promise<any> => {
        const profile = await Profile.find({}).exec();
        return profile;
}

export const create = async(body: any) => {
        const profile = await Profile.create(body);
        return profile;
}


export const update = async (id: string | undefined, body: any) => {
    const profile = await Profile.findById({ _id: id }).exec();
        if (!profile) throw Error(`User with Id: ${id} doesn't exist`);

        profile.set(body);
        profile.save();
        return profile;
}

export const _delete = async(id: string) => {
        const profile = await Profile.findByIdAndDelete({ _id: id });
        return profile;
}