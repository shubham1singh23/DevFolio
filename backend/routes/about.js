import express from 'express'
import About from '../models/About.js'
import Skill from '../models/Skill.js'
import { verifyAdmin } from './utils.js'
import multer from 'multer'
import cloudinary from '../cloudinary.js'
import streamifier from 'streamifier'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// Get about info
router.get('/', async (req, res) => {
  const about = await About.findOne({}).populate('pinnedSkills')
  res.json(about)
})

// Set or update about info (admin only)
router.post('/', verifyAdmin, upload.single('profileImage'), async (req, res) => {
  let profileImage = req.body.profileImage
  if (req.file) {
    profileImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      })
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }
  const { name, description, pinnedSkills } = req.body
  let about = await About.findOne({})
  if (!about) {
    about = new About({ name, description, profileImage, pinnedSkills })
  } else {
    about.name = name
    about.description = description
    about.profileImage = profileImage
    about.pinnedSkills = pinnedSkills
  }
  await about.save()
  const populated = await About.findById(about._id).populate('pinnedSkills')
  res.json(populated)
})

export default router
