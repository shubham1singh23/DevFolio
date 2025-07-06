import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String, // FontAwesome icon name or similar
  category: { type: String, enum: ['Programming Languages', 'Frameworks', 'Databases', 'Others'], required: true }
}, { timestamps: true })

export default mongoose.model('Skill', skillSchema)
