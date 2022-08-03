import { Schema, model } from "mongoose";
interface IRate {
  rate?: number;
}
const rateFields = {
  // the user will be populated when authentication and authorization is done

  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
};

const RateSchema = new Schema<IRate>(rateFields, { timestamps: true });
// users can give one review to one article prevents the user from giving more than one review to one article
// RateSchema.index({ article: 1, user: 1 }, { unique: true });

//TODO to get the average rate of an article we need to sum all the rates and divide them by the number of rates

const Rate = model<IRate>("Rate", RateSchema);
export default Rate;
