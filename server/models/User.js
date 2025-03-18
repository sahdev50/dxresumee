const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  authType: { type: String, enum: ['local', 'google'], default: 'local' }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
