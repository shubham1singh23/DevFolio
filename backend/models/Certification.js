import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  certificationName: { type: String, required: true },
  issuingOrganization: { type: String, required: true },
  issueDate: { type: String, required: true },
  expiryDate: { type: String, default: 'No expiry' },
  credentialId: { type: String },
  verificationLink: { type: String },
  description: { type: String },
  isVisible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Certification', certificationSchema); 