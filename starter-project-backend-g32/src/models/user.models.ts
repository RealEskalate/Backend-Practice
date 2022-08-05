import {Schema, model,Document} from "mongoose"
import bcrypt from 'bcrypt';
export interface IUser extends Document {
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


userSchema.pre('save', function (next) { 
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    }
    );
  }
  );
}
);


const User = model<IUser>('User', userSchema);
export default User;
