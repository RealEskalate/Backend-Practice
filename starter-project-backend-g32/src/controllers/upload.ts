import { Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import User from '../models/user.models'
import Article from '../models/article'

export const deleteUserProfile = async (req: Request, res: Response) => {
      try {
          let user = await User.findById(req.params.id)
          const cloudinaryId = user?.profilePic.split(/.jpg|.jpeg|.png/,2)[1]
          cloudinaryId && (await cloudinary.uploader.destroy(cloudinaryId))
          const data = {
            profilePic: "",
          }
          user = await User.findByIdAndUpdate(req.params.id, data, { new: true })
          res.status(200).json(user)
      } catch (err) {
          res.status(404).json(err)
      }
}


export const updateUserProfile = async (req: Request, res: Response) => {
      try {
          let user = await User.findById(req.params.id)
          const cloudinaryId = user?.profilePic.split(/.jpg|.jpeg|.png/,2)[1]
          cloudinaryId && (await cloudinary.uploader.destroy(cloudinaryId))
          let result = {secure_url:"",public_id:""};
          if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
          }else{
            return res.status(400).end()
          }
          const profileData = user?.profilePic || result.secure_url + result.public_id
          
          const data = {
            profilePic: profileData
          };
          user = await User.findByIdAndUpdate(req.params.id, data, { new: true })
          res.status(200).json(user)
      } catch (err) {
          res.status(404).json(err)
      }
    }

export const deleteArticleMedia = async (req: Request, res: Response) => {
        try {
            let article = await Article.findById({_id:req.params.id})
            const cloudinaryId = article?.media.split(/.jpg|.jpeg|.png/,2)[1]
            cloudinaryId && (await cloudinary.uploader.destroy(cloudinaryId))
            const data = {
                media: '',
            }
            article = await Article.findByIdAndUpdate(req.params.id, data, { new: true })
            res.status(200).json(article)
        } catch (err) {
            res.status(404).json(err)
        }
}
    
    
export const updateArticleMedia = async (req: Request, res: Response) => {
      try {
          let article = await Article.findById(req.params.id)
          const cloudinaryId = article?.media.split(/.jpg|.jpeg|.png/,2)[1]
          cloudinaryId && (await cloudinary.uploader.destroy(cloudinaryId))
          let result = {secure_url:"",public_id:""};
          if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
          }else{
            return res.status(400).end()
          }
          const profileData = article?.media || result.secure_url + result.public_id

          const data = {
              media: profileData,
          }
          article = await Article.findByIdAndUpdate(req.params.id, data, { new: true })
          res.status(200).json(article)
        } catch (err) {
          res.status(404).json(err)
        }
    }