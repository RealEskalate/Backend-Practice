import mongoose, { Schema } from 'mongoose';
import IChapterInterface from './interface';

const ChapterSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  hoe: { type: String, required: true },
  deputyHoe: { type: String, required: true },
  location : {type: String, required: true}
});

export default mongoose.model<IChapterInterface>('Chapter', ChapterSchema);