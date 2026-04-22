const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    let user = await Student.findOne({ email });
    if (user) return res.status(400).json("Email already registered");

    const hashed = await bcrypt.hash(password, 10);

    user = new Student({ name, email, password: hashed, course });
    await user.save();

    res.json("Registered successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Invalid email or password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get Logged-in User
router.get("/me", auth, async (req, res) => {
  try {
    const user = await Student.findById(req.user).select("-password");
    res.json(user);
  } catch {
    res.status(500).json("Server error");
  }
});

// Update Password
router.put("/update-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Student.findById(req.user);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json("Wrong old password");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json("Password updated");
  } catch {
    res.status(500).json("Error updating password");
  }
});

// Update Course
router.put("/update-course", auth, async (req, res) => {
  try {
    const { course } = req.body;

    const user = await Student.findById(req.user);
    user.course = course;
    await user.save();

    res.json("Course updated");
  } catch {
    res.status(500).json("Error updating course");
  }
});

module.exports = router;