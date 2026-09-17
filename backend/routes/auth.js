const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Anti-caching middleware for sensitive auth routes
router.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


// POST /auth/register — Sign up a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !username.trim()) {
      console.warn("[AUTH_VALIDATION] Missing username in registration payload");
      return res.status(400).json({ error: "Username is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Validate email format
    // Validate email format via EMAIL_REGEX
    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const field = existingUser.username === username ? "Username" : "Email";
      return res.status(400).json({ error: `${field} already exists` });
    }

    // Create and save the user (password hashed by pre-save hook)
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// POST /auth/login — Log in an existing user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !username.trim()) {
      console.warn("[AUTH_VALIDATION] Missing username in registration payload");
      return res.status(400).json({ error: "Username is required" });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Find user by username
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Failed to log in" });
  }
});

module.exports = router;
