import express from 'express'
import Project from '../models/Project.js'
import { verifyAdmin } from './utils.js'
import multer from 'multer'
import cloudinary from '../cloudinary.js'
import streamifier from 'streamifier'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// Get all projects (ordered by position)
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ position: 1, createdAt: -1 })
  res.json(projects)
})

// Add new project (admin only, with image upload)
router.post('/', verifyAdmin, upload.single('image'), async (req, res) => {
  let imageUrl = req.body.image
  if (req.file) {
    imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      })
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }

  // Get the highest position and add 1 for the new project
  const lastProject = await Project.findOne().sort({ position: -1 })
  const newPosition = lastProject ? lastProject.position + 1 : 0

  const project = new Project({ ...req.body, image: imageUrl, position: newPosition })
  if (typeof project.tech === 'string') project.tech = project.tech.split(',').map(t => t.trim())
  await project.save()
  res.status(201).json(project)
})

// Update project (admin only, with image upload)
router.put('/:id', verifyAdmin, upload.single('image'), async (req, res) => {
  let imageUrl = req.body.image
  if (req.file) {
    imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      })
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image: imageUrl },
    { new: true }
  )
  res.json(project)
})

// Update project positions (admin only)
router.put('/positions/update', verifyAdmin, async (req, res) => {
  const { positions } = req.body // Array of { id, position }

  try {
    // Update each project's position
    for (const { id, position } of positions) {
      await Project.findByIdAndUpdate(id, { position })
    }

    // Return updated projects in order
    const projects = await Project.find().sort({ position: 1, createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update positions' })
  }
})

// Delete project (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router
