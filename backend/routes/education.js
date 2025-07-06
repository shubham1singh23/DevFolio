import express from 'express';
import Education from '../models/Education.js';
import verifyAdmin from '../middleware/auth.js';

const router = express.Router();

// Get all visible education entries
router.get('/', async (req, res) => {
  try {
    const education = await Education.find({ isVisible: true });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all education entries
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add new education entry
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update education entry
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete education entry
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
