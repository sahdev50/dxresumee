const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
  registerUser,
  verifyOtp,
  loginUser,
  resendOTP,
  getMe,
  logoutUser
} = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

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
      secure:false,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect('http://localhost:5173/dashboard');

    // response
    // res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });
    
  }
);

router.post('/register', registerUser);
router.post('/verify', verifyOtp);
router.post('/login', loginUser);
router.post('/resend-otp', resendOTP);
router.get('/logout', logoutUser);

router.get('/me', protect, getMe);

module.exports = router;