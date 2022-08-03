import { Schema, model } from "mongoose";
const rateFields = {
  user
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
};

const RateSchema = new Schema(rateFields, { timestamps: true });
const Rate = model("Rate", RateSchema);

export default Rate;
