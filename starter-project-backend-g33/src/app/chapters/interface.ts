import mongoose, { Schema, Document } from 'mongoose';

interface IChapterInterface extends Document {

    name: String;
    HoE: String;
    DeputyHoE: String;
    location: String;
}

export default IChapterInterface
