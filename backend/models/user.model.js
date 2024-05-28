// Import mongoose
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer',
  },
}, {
  timestamps: true, // Automatically include createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
