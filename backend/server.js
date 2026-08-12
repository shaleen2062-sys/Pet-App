require("dotenv").config();
const mongoose = require("mongoose");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

