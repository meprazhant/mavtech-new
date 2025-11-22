import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  subject: string;
  content: string;
  audience: string;
  recipients: string[];
  status: 'draft' | 'sent';
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    audience: {
      type: String,
      default: 'all',
    },
    recipients: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'sent', "feature"],
      default: 'draft',
    },
    sentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
