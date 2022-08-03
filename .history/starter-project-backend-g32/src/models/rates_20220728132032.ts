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
  
  { timeStamps: true }
);

const RateModel = model("Rate", RateSchema);
