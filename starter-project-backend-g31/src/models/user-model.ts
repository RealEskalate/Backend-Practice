// user.model.ts
import { Document, Schema, model } from 'mongoose';

import bcrypt from 'bcryptjs';

// Create the interface
export interface IUser extends Document {
  [x: string]: any;
  email: string;
  password: string;
}

// Create the schema
const userSchema = new Schema<IUser>({
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


// methods 
 
userSchema.pre('save', function preSave(next) { 
  let model = this; 

  model.hashpassword(model.password, (err: any, hash: string) => { 
      model.password = hash; 
      next(); 
  }); 
}) 


userSchema.method({ 
    verifyPassword(passwd) { 
      return new Promise((resolve, reject) => { 
        bcrypt.compare(passwd, this.password, (err, isMatch) => { 
          if (err) { 
            return reject(err); 
          } 
          
          resolve(isMatch); 
        }) 
      }); 
    }, 
    hashpassword(passwd, cb) {  
      let createHash = (err: any, hash: any) => { 
        if (err) { 
          return cb(err); 
        } 
     
        cb(null, hash);
      } 
     
      let generateSalt = (err: any, salt: string | number) => { 
        if (err) { 
          return cb(err); 
        } 
     
        // Hash the password using the generated salt 
        bcrypt.hash(passwd, salt, createHash); 
      } 
     
      // Generate a salt factor 
      bcrypt.genSalt(12, generateSalt);  
    } 
}) 

// Create and export user model
export const userModel = model<IUser>("User", userSchema);



