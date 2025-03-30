const express = require("express");
const Company = require("../models/companyModel");

const router = express.Router();

// Register Company
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const company = new Company({ name, email, password });
    await company.save();
    res.status(201).json({ message: "Company registered", company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
