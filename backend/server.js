const dns = require('dns').promises;
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"   // allow all (safe for now)
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use("/api", require("./routes/authRoutes"));

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));