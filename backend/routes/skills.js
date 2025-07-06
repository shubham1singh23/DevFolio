import express from 'express'
import Skill from '../models/Skill.js'
import { verifyAdmin } from './utils.js'

const router = express.Router()

// Get all skills
router.get('/', async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, name: 1 })
  res.json(skills)
})

// Add new skill (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const skill = new Skill(req.body)
  await skill.save()
  res.status(201).json(skill)
})

// Update skill (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(skill)
})

// Delete skill (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router
