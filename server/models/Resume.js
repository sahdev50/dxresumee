const mongoose = require('mongoose');

const extraSectionSchema = new mongoose.Schema({
  title: String,
  content: String, // store as HTML string
});

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  phone: String,
  summary: String,
  education: String,
  experience: String,
  skills: [String],
  extraSections: [extraSectionSchema], // ✨ added this
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
