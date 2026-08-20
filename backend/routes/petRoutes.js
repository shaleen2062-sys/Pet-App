const express = require("express");
const router = express.Router();

const { createPet, getPet } = require("../controllers/petController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPet);

router.get("/", authMiddleware, getPet);

module.exports = router;
