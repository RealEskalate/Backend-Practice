import mongoose, { Model } from 'mongoose'



const getOne = (
    model:
        Model<any, {}, {}>
) => async (id: any) => {

    try {
        const doc = await model.findOne({ _id: id })
        return doc
    } catch (e) {
        console.log(e)
    }
}

const getAll = (
    model:
        Model<any, {}, {}>
) => async (props: any) => {
    try {
        const filter = props
        const docs = await model.find(filter)
        return docs
    } catch (e) {
        console.log(e)
    }
}

const createOne = (
    model:
        Model<any, {}, {}>
) => async (props: any) => {
    try {
        const payload = props
        const doc = await model.create(payload)
        return doc
    } catch (e) {
        console.log(e)
    }
}

const updateOne = (
    model:
        Model<any, {}, {}>
) => async (props: any, id: String) => {
    try {
        const payload = props

        const doc = await model
            .updateOne(
                {
                    _id: id,
                },
                { $set: { payload }, }
            )

        return doc

    } catch (e) {
        console.log(e)
    }
}

const clap = (
    model: Model<any, {}, {}>
) => async (props: any) => {
    try {
        const articleId = props.articleId
        const userId = props.userId

        const doc = await model
            .updateOne(
                {
                    _id: articleId,
                },
                { $push: { clappers: userId } }
            )

        return doc
    } catch (e) {
        console.log(e)
    }
}

const deleteOne = (
    model: Model<any, {}, {}>
) => async (id: any) => {
    try {

        const doc = await model
            .updateOne(
                {
                    _id: id,
                },
                { $set: { isActive: false } }
            )

        return doc
    } catch (e) {
        console.log(e)
    }
}

const dataAccessLayer = (
    model:
        Model<any, {}, {}>
) => ({
    updateOne: updateOne(model),
    getMany: getAll(model),
    getOne: getOne(model),
    createOne: createOne(model),
    clap: clap(model),
    deleteOne: deleteOne(model)
})

export default dataAccessLayer

