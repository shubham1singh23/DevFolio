import express from 'express';
import Certification from '../models/Certification.js';
import verifyAdmin from '../middleware/auth.js';

const router = express.Router();

// Get all visible certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find({ isVisible: true }).sort({ createdAt: -1 });
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all certifications
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add new certification
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.status(201).json(certification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update certification
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(certification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete certification
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certification deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 