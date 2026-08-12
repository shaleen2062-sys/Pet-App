import express from 'express';
import { createPet } from '../controllers/petController.js';

const router = express.Router();

// POST /api/pets - Create a new pet
router.post('/', createPet);

export default router;
