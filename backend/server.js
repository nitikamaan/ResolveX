// ================= DNS CONFIG =================
const dns = require("dns").promises;
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ================= INIT APP =================
const app = express();

// ================= CONNECT DB =================
connectDB();

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
app.use("/api/grievances", require("./routes/grievanceRoutes"));

// ================= ERROR HANDLER =================
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});