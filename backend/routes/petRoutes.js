const express = require("express");
const router = express.Router();

const { createPet, getPet, feedPet, playPet, sleepPet, updatePet, deletePet } = require("../controllers/petController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPet);

router.get("/", authMiddleware, getPet);
router.put("/",authMiddleware,updatePet);
router.delete("/",authMiddleware,deletePet);
router.put("/feed",authMiddleware,feedPet);
router.put("/sleep", authMiddleware, sleepPet);
router.put("/play", authMiddleware, playPet);


module.exports = router;
