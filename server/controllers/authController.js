const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const dotenv = require('dotenv');
const { getOtpEmailTemplate, getResendOtpEmailTemplate, verificationSuccessEmail } = require('../utils/emailTemplates');
const sendEmail = require('../utils/sendEmail');


dotenv.config()


// Helper: generate 6-digit code
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, verified: false,authType: 'local' });
    await newUser.save();

    const code = generateOTP();
    await Otp.create({ email, code });

    await sendEmail(
      email,
      'Verify your email - OTP Code',
      getOtpEmailTemplate(name, code),
    ) 

    res.status(201).json({ message: 'User registered. Check email for verification code.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const existingOtp = await Otp.findOne({ email });
    console.log(existingOtp)
    if (!existingOtp || existingOtp.code !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark user as verified
    user.verified = true;
    await user.save();

    await Otp.deleteOne({ email });

    // 🔥 Create token and send login cookie immediately
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true only in production
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await sendEmail(
      user.email,
      'Email Verified - Welcome to DxResumee 🎉',
      verificationSuccessEmail(user.name)
    );

    return res.status(200).json({
      message: 'OTP verified, logged in successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    }); 

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};


// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.authType === 'google') {
      return res.status(400).json({ message: 'Please login using Google Sign-In' });
    }

    if (!user.verified) return res.status(401).json({ message: 'User not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // ✅ Set token in HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
      secure:false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.verified) return res.status(400).json({ message: 'User is already verified' });
  
      // Delete old OTPs
      await Otp.deleteMany({ email });
  
      // Generate new OTP
      const code = generateOTP();
      await Otp.create({ email, code });

      await sendEmail(
        user.email,
        'Resend OTP - Your Verification Code',
        getResendOtpEmailTemplate(user.name, code),
      );
  
      res.json({ message: 'New verification code sent to email' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // authController.js
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Logout

exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};


  
