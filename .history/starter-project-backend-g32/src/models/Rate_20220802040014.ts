import { Schema, model, connect } from "mongoose";
interface IRate {
  rate: number;
}
const rateFields = {
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
};

const RateSchema = new Schema<IRate>(rateFields, { timestamps: true });
const Rate = model<IRate>("Rate", RateSchema);

export default Rate;
