require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const dns = require("dns");
const authController = require("./controllers/authController");
const authenticate = require("./middleware/authMiddleware");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(express.json());

const getUser = async (req, res) => {
  try {
    res.status(200).json({
      id: req.user._id,
      email: req.user.email,
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

app.get("/api/me", authenticate, getUser);

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
