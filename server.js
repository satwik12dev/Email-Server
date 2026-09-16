const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://satwik-12-dev.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Contact route
app.use("/api/contact", require("./routes/contactRoutes"));

// Test Brevo API key
app.get("/test", (req, res) => {
  res.json({
    keyExists: !!process.env.BREVO_API_KEY,
    prefix: process.env.BREVO_API_KEY?.substring(0, 8),
  });
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
