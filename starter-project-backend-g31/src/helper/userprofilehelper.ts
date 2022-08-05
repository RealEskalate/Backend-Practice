import { AnyAaaaRecord } from 'dns'
import cloudinary from '../utils/cloudinary'

export async function destructProfile(body: any, fileRequest: any) {
    var { _id, name, username, bio, phone } = body
    var file = undefined
    if (fileRequest) {
            const result = await cloudinary.uploader.upload(fileRequest.path)
            file  = result.url
        }
    var avatar  = file

    interface Profile{
        _id?: string,
        name?: string,
        username?: string,
        bio?: string,
        phone?: string,
        avatar?: string
    }

    var newProfile: Profile = {}

    if (_id)    newProfile["_id"] = _id
    if (username)   newProfile["username"] = username
    if (name)   newProfile["name"] = name
    if (bio)    newProfile["bio"] = bio
    if (phone)  newProfile["phone"] = phone
    if (avatar) newProfile["avatar"] = avatar
    
    return newProfile
}