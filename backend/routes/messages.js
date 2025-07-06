import express from 'express'
import Message from '../models/Message.js'
import nodemailer from 'nodemailer'

const router = express.Router()

// Get all messages (admin only, optional)
// router.get('/', verifyAdmin, async (req, res) => {
//   const messages = await Message.find().sort({ createdAt: -1 })
//   res.json(messages)
// })

// Contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body
  const msg = new Message({ name, email, message })
  await msg.save()

  // Send email notification (optional)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Portfolio Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    })
  }

  res.status(201).json({ success: true })
})

export default router
