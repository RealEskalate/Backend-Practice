import { Schema, model } from "mongoose";
const rateFields = {
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
};

const RateSchema = new Schema(
  {
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timeStamps: true }
);

const RateModel = model("Rate", RateSchema);
