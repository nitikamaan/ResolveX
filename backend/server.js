const dns = require('dns').promises;
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ================= ROUTES =================
app.use("/api", require("./routes/authRoutes"));

// ================= ERROR HANDLER =================
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// ================= SERVER START AFTER DB =================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("DB Connection Failed ❌", err);
  });