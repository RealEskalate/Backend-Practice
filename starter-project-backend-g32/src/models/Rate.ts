import { Schema, model } from "mongoose";
interface IRate {
  rate: number;
}
const rateFields = {

  // this will change later
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // post: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Post",
  //   required: true,
  // }

  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
};

const RateSchema = new Schema<IRate>(rateFields, { timestamps: true });
const Rate = model<IRate>("Rate", RateSchema);
export default Rate;
