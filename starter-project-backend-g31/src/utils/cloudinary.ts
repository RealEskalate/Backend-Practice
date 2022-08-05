import dotenv from 'dotenv'

dotenv.config()
const cloudinary = require('cloudinary').v2

cloudinary.config()
export default cloudinary