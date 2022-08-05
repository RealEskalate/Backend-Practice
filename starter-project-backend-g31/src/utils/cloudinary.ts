import dotenv from 'dotenv'

dotenv.config()
const cloudinary = require('cloudinary').v2

cloudinary.config()
export default cloudinary

export async function upload(path: any) {
    const result = await cloudinary.uploader.upload(path, {
        use_filename: true,
        unique_filename: false,
        folder: process.env.DOC_FOLDER_NAME
    })
    if (result) {
        return  [result.secure_url, result.public_id]
    }
    throw Error('Image Upload failed')
}

export async function remove(path: any) {
    return await cloudinary.uploader.destroy(path)
}

export async function update(oldpath: any, newpath: any): Promise<Array<string>> {
    if (oldpath) {
        await cloudinary.uploader.destroy(oldpath)
    }
        const result = await cloudinary.uploader.upload(newpath, {
                use_filename: true,
                unique_filename: false,
                folder: process.env.DOC_FOLDER_NAME
            })
            if (result) {
                return  [result.secure_url, result.public_id]
            }
            throw Error('Image Update failed')
}