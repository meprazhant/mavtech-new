import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  featuredImage: string;
  gallery: string[];
  shortDescription: string;
  longDescription: string;
  status: 'In Development' | 'Released' | 'Beta Released';
  tags: string[];
  link?: string;
  featured: boolean;
  category: string;
  location: string;
  duration: string;
  bgColor: string;
  textColor: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
    },
    longDescription: {
      type: String,
    },
    featuredImage: {
      type: String,
      required: [true, 'Please provide a featured image'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['In Development', 'Released', 'Beta Released'],
      default: 'In Development',
    },
    tags: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, 'Please provide a project category'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a project location'],
    },
    duration: {
      type: String,
      required: [true, 'Please provide a project duration'],
    },
    bgColor: {
      type: String,
      required: [true, 'Please provide a background color'],
    },
    textColor: {
      type: String,
      required: [true, 'Please provide a text color'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
