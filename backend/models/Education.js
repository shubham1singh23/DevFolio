import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  examTitle: { type: String, required: true },
  score: { type: String, required: true }
});

const educationSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  collegeName: { type: String, required: true },
  duration: { type: String },
  scores: [scoreSchema],
  isVisible: { type: Boolean, default: true }
});

export default mongoose.model('Education', educationSchema);
