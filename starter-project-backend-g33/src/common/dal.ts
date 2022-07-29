import { Model, Mongoose } from "mongoose";

import IArticleInterface from "../app/articles/interface";
import IChapterInterface from "../app/chapters/interface";
import ICommentInterface from "../app/comments/interface";
import IUserInterface from "../app/users/interface";

const getOne = (
    model: 
    Model<IChapterInterface> | 
    Model<IUserInterface> | 
    Model<IArticleInterface> | 
    Model<ICommentInterface>
    ) => async (req: any, res: any) => {

    try {
        const requestedId = req.params.id
        const doc = await model.findOne({ _id: requestedId })

        if (!doc) {
            return res.status(404).end()
        }

        res.status(200).json(doc)
    } catch (e) {
        console.log(e)
    }
};

// const getAll = (
//     model: 
//     Model<IChapterInterface> | 
//     Model<IUserInterface> | 
//     Model<IArticleInterface> | 
//     Model<ICommentInterface>
//     ) => async (req: any, res: any)  => {
//     try {
//         const docs = await model.find()
//         res.status(200).json(docs)
//     } catch (e) {
//         console.log(e)
//     }
// }

const createOne = (
    model:   
    Model<IChapterInterface> | 
    Model<IUserInterface> | 
    Model<IArticleInterface> | 
    Model<ICommentInterface>
    ) => async (req: any, res: any) => {
    try {
        const payload = req.body
        const doc = await model.create(payload)
        res.status(201).json(doc)
    } catch (e) {
        console.log(e)
    }
}

const updateOne =(
    model: 
    Model<IChapterInterface> | 
    Model<IUserInterface> | 
    Model<IArticleInterface> | 
    Model<ICommentInterface>
    ) => async (req: any, res: any) => {
    try {
        const payload = req.body

        const doc = await model
            .updateOne(
                {
                    _id: req.params.id,
                },
                { $set: { payload }, }
            )

        if (!doc) {
            return res.status(404).end()
        }

        res.status(200).json(doc)
    } catch (e) {
        console.log(e)
    }
}


const dataAccessLayer = (
    model: 
    Model<IChapterInterface> | 
    Model<IUserInterface> | 
    Model<IArticleInterface> | 
    Model<ICommentInterface>
    ) => ({
    updateOne: updateOne(model),
    // getMany: getAll(model),
    getOne: getOne(model),
    createOne: createOne(model)
})

export default dataAccessLayer
