import mongoose, { Schema, Document } from 'mongoose';

interface chapterInterface extends Document {

    name: String;
    HoE: String;
    DeputyHoE: String;
    location: String;
}

export default chapterInterface
