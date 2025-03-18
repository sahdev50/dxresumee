// server.js
const express = require('express');
const dotenv = require('dotenv');

// cross site
const cors = require('cors');

// database
const connectDB = require('./config/db');

// routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')

const helmet = require('helmet');

const passport = require('passport');
const session = require('express-session');

const cookieParser = require('cookie-parser');

require('./config/passport');

dotenv.config()

connectDB()

const app = express();

// for creating cookies
app.use(cookieParser());

// more secure
app.use(helmet());

const PORT = 5050;

// Google SignIn/SignUp
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);

// Simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });