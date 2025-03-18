const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const transporter = require('../config/mailer');
const dotenv = require('dotenv');
const { getOtpEmailTemplate, getResendOtpEmailTemplate } = require('../utils/emailTemplates');


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

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email - OTP Code',
        html: getOtpEmailTemplate(name, code),
      });
      

    res.status(201).json({ message: 'User registered. Check email for verification code.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP
exports.verifyUser = async (req, res) => {
  const { email, code } = req.body;
  try {
    const otpRecord = await Otp.findOne({ email, code });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid or expired OTP' });

    await User.findOneAndUpdate({ email }, { verified: true });
    await Otp.deleteMany({ email });

    res.json({ message: 'User verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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
      secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
      sameSite: 'Strict',
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
  
      // Send OTP via email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Resend OTP - Your Verification Code',
        html: getResendOtpEmailTemplate(user.name, code),
      });
      
  
      res.json({ message: 'New verification code sent to email' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
