const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const vendorRoutes = require("./routes/vendorRoutes");
const companyRoutes = require("./routes/companyRoutes");
const counsellorRoutes = require("./routes/counsellorRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/vendor", vendorRoutes);
app.use("/company", companyRoutes);
app.use("/counsellor", counsellorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
