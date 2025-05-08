import mongoose from "mongoose"
import { Role } from './roleModel.js'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  verificationToken: String,
  resetPasswordToken: String,
  isVerified: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
