const express = require("express");
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE
router.post("/", auth, async (req, res) => {
  const grievance = new Grievance({
    ...req.body,
    student: req.user
  });
  await grievance.save();
  res.json(grievance);
});

// GET ALL
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find({ student: req.user });
  res.json(data);
});

// 🔥 MOVE SEARCH ABOVE :id
router.get("/search", auth, async (req, res) => {
  const data = await Grievance.find({
    title: { $regex: req.query.title, $options: "i" },
    student: req.user   // ✅ VERY IMPORTANT (user-specific)
  });
  res.json(data);
});

// GET BY ID
router.get("/:id", auth, async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const data = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;