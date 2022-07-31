// user.model.ts
import { Document, Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';

// Create the interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create the schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
    maxlength: 128
  }
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  }
});

userSchema.method("hashPassword", function (): void {
    // Generate a salt factor 
    const salt = bcrypt.genSaltSync(12);
    // Hash the password using the generated salt 
    const hash = bcrypt.hashSync(this.password, salt);
  
    this.password = hash;
  });

// Create and export user model
export const userModel = model<IUser>("User", userSchema);



