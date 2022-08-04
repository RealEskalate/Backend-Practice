import { userModel } from '../models/user-model';

export const signupUser = async (req: any) => {

    try {
        const user = await userModel.create({
            ...req.body, 
            })

        return {user}

    } catch (error) {
        throw error;
    }

}