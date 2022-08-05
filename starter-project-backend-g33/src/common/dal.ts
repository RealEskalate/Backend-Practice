import { Model } from 'mongoose'
import logger from './logger'

const getOne = (model: Model<any, {}, {}>) => async (props: any) => {
  logger.info(`Fetching ${model.modelName} with id: ${props}`)
  return await model.findOne(props)
}

const getAll = (model: Model<any, {}, {}>) => async (props: any) => {
  logger.info(`Fetching all ${model.modelName} with props: ${props}`)
  return await model.find(props)
}

const createOne = (model: Model<any, {}, {}>) => async (props: any) => {
  logger.info(`Creating ${model.modelName}`)
  return await model.create(props)
}

const updateOne =
  (model: Model<any, {}, {}>) => async (props: any, id: String) => {
    logger.info(`Updating ${model.modelName} with id: ${id}`)

    const payload = props
    return await model.findOneAndUpdate({ _id: id }, payload, { new: true })
  }

const clap = (model: Model<any, {}, {}>) => async (props: any) => {
  const { articleId, userId } = props
  logger.info(`Clapping ${model.modelName} with id: ${articleId}`)
  return await model.updateOne(
    { _id: articleId },
    { $push: { clappers: userId } }
  )
}

const deleteOne = (model: Model<any, {}, {}>) => async (id: any) => {
  logger.info(`Deleting ${model.modelName} with id: ${id}`)

  return await model.updateOne(
    {
      _id: id
    },
    { $set: { isActive: false } }
  )
}

// custom dal for unique needs
import User from '../resources/users/model'
const getManyUserSecured = async (prop) => {
  logger.info(`Fetching all active users securely`)
  return await User.find(prop, '-password').exec()
}

const dataAccessLayer = (model: Model<any, {}, {}>) => ({
  updateOne: updateOne(model),
  getMany: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
  clap: clap(model),
  deleteOne: deleteOne(model),
  getManyUserSecured
})

export default dataAccessLayer
