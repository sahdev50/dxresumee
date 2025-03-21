// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Protect all resume routes

router.post('/', createResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

module.exports = router;
