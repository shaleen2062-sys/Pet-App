const express = require("express");
const router = express.Router();

const { createPet } = require("../controllers/petController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPet);

module.exports = router;