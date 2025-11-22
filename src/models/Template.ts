import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
    name: string;
    html: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a template name'],
            unique: true,
        },
        html: {
            type: String,
            required: [true, 'Please provide HTML content'],
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Template || mongoose.model<ITemplate>('Template', TemplateSchema);
