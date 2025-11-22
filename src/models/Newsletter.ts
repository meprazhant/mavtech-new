import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
    email: string;
    source: string;
    status: 'active' | 'unsubscribed';
    createdAt: Date;
    updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
    {
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        source: {
            type: String,
            default: 'General',
        },
        status: {
            type: String,
            enum: ['active', 'unsubscribed'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
