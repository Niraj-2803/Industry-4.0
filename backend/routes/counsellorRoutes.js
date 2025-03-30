const express = require("express");
const Counsellor = require("../models/counsellorModel");

const router = express.Router();

// Register Counsellor
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const counsellor = new Counsellor({ name, email, password });
    await counsellor.save();
    res.status(201).json({ message: "Counsellor registered", counsellor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Counsellors
router.get("/", async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    res.status(200).json(counsellors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
