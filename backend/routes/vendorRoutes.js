const express = require("express");
const Vendor = require("../models/vendorModel");

const router = express.Router();

// Register Vendor (Dynamic Type)
router.post("/:type", async (req, res) => {
  const { name, email, password } = req.body;
  const { type } = req.params;

  if (!["ERP", "AI", "IOT"].includes(type.toUpperCase())) {
    return res.status(400).json({ message: "Invalid vendor type" });
  }

  try {
    const vendor = new Vendor({ name, email, password, type: type.toUpperCase() });
    await vendor.save();
    res.status(201).json({ message: "Vendor registered", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request a Vendor (Company sends request)
router.post("/request/:vendorId", async (req, res) => {
  const { companyId } = req.body;
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.requests.push({ companyId });
    await vendor.save();
    res.status(200).json({ message: "Request sent to vendor", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
