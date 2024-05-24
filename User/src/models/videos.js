import { Schema, model } from "mongoose";

// Define the video schema for auditioning
const videoSchema = new Schema({
  contestant: {
    type: Schema.Types.ObjectId,
    ref: 'Contestant',
    required: true
  },
  VideoUrl: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model("Video", videoSchema);