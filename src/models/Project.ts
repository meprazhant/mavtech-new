import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  gallery: string[];
  content: string;
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
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
    },
    image: {
      type: String,
      required: [true, 'Please provide a project image'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
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
