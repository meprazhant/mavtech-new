import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
    name: string;
    mainImage?: string;
    link?: string;
    logoImage?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        mainImage: { type: String },
        link: { type: String },
        logoImage: { type: String },
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);
