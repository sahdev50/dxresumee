const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
  registerUser,
  verifyUser,
  loginUser,
  resendOTP
} = require('../controllers/authController');

dotenv.config()

// Initiate Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route
router.get('/callback/google',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
     // Create JWT
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Set HttpOnly Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // response
    res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });
    
  }
);

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);
router.post('/resend-otp', resendOTP);

module.exports = router;