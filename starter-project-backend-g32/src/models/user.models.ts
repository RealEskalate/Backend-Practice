import {Schema, model, connect} from "mongoose"

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string;
};

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: [8, "password can not be less than 8 characters"],
    max: [20, "password can not be more than 20 characters"],
  },
  profilePic: String,
});

const User = model<IUser>('User', userSchema);
export default User;
