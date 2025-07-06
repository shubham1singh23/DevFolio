import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import projectRoutes from './routes/projects.js'
import skillRoutes from './routes/skills.js'
import messageRoutes from './routes/messages.js'
import adminRoutes from './routes/admin.js'
import aboutRoutes from './routes/about.js'
import educationRoutes from './routes/education.js'
import certificationRoutes from './routes/certifications.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/certifications', certificationRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error('MongoDB connection error:', err))
