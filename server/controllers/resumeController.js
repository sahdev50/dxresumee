// controllers/resumeController.js
const Resume = require('../models/Resume');

// Create resume
exports.createResume = async (req, res) => {
  try {
    const { name, email, phone, summary, education, experience, skills, extraSections } = req.body;

    const resume = new Resume({
      user: req.user.id,
      name,
      email,
      phone,
      summary,
      education,
      experience,
      skills,
      extraSections,
    });

    await resume.save();
    res.status(201).json({ message: 'Resume created successfully', resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating resume' });
  }
};

// Get all resumes of user
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resumes' });
  }
};


exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resume', error });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json({ message: 'Resume updated', resume: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error });
  }
};
