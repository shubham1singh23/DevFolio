import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Admin from './models/Admin.js'

dotenv.config()

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI)
  const username = process.argv[2] || 'admin'
  const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'admin123'
  const hash = await bcrypt.hash(password, 10)
  const exists = await Admin.findOne({ username })
  if (exists) {
    console.log('Admin already exists')
    process.exit(0)
  }
  await Admin.create({ username, password: hash })
  console.log('Admin created:', username)
  process.exit(0)
}

createAdmin()
