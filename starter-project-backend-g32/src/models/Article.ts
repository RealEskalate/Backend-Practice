import { Schema, model } from "mongoose";
interface IArtcle {
  rate: number;
}
const articleFields = {
  text: {
    type: String,
    required: true,
  },
};

const ArticleSchema = new Schema<IArtcle>(articleFields, { timestamps: true });
const Article = model<IArtcle>("Article", ArticleSchema);
export default Article;
