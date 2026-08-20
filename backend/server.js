require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const dns = require("dns");
const authController = require("./controllers/authController");
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
