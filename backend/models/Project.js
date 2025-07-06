import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tech: [String],
  image: String,
  github: String,
  live: String,
  position: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
