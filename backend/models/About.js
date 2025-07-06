import mongoose from 'mongoose'

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  profileImage: { type: String }, // Cloudinary URL
  pinnedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
}, { timestamps: true })

export default mongoose.model('About', aboutSchema)
