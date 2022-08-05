import { userModel } from '../models/user-model';

export const signupUser = async (req: any) => {
    try {
        const user = new userModel ({
                email: req.body.email,
                password: req.body.password
            })
        const newUser = await user.save()
        return newUser

    } catch (error) {
        throw error;
    }

}