import mongoose, { Model } from 'mongoose'

const getOne = (model: Model<any, {}, {}>) => async (id: any) => {
  return await model.findOne({ _id: id })
}

const getAll = (model: Model<any, {}, {}>) => async (props: any) => {
  return await model.find(props)
}

const createOne = (model: Model<any, {}, {}>) => async (props: any) => {
  return await model.create(props)
}

const updateOne =
  (model: Model<any, {}, {}>) => async (props: any, id: String) => {
    const payload = props
    return await model.findOneAndUpdate({id: id}, payload , {new: true})

  }

const clap = (model: Model<any, {}, {}>) => async (props: any) => {
  const articleId = props.articleId
  const userId = props.userId

  return await model.updateOne(
    {
      _id: articleId
    },
    { $push: { clappers: userId } }
  )
}

const deleteOne = (model: Model<any, {}, {}>) => async (id: any) => {
  return await model.updateOne(
    {
      _id: id
    },
    { $set: { isActive: false } }
  )
}

const dataAccessLayer = (model: Model<any, {}, {}>) => ({
  updateOne: updateOne(model),
  getMany: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
  clap: clap(model),
  deleteOne: deleteOne(model)
})

export default dataAccessLayer
