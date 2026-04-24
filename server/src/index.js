require("dotenv").config(); // .env ফাইল লোড করার জন্য
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Using your .env URI)
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});