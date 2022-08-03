import { Schema, model } from "mongoose";
const rateFields = {
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
};

const RateSchema = new Schema(rateFields);

const RateModel = model("Rate", RateSchema);
