
const cloudinary = require('cloudinary').v2
import dotenv from 'dotenv'

dotenv.config()

import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({})


export const upload = multer(
    {
        storage: storage,
        fileFilter: (req, file, cb) => {
            const ext =  path.extname(file.originalname)
            const allowedextensions = new Set(['.png', '.jpg', '.jpeg', '.svg'])
            if(ext in allowedextensions){
                return cb(null, true)
            }
            return cb(null, false)
        },
        limits: {
            fileSize: 1024*1024,
        }
    }
)



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API?.toString(),
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
})



export default cloudinary

