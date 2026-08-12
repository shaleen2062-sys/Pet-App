import Pet from '../models/Pet.js';
import User from '../models/User.js';

/**
 * @desc    Create a new pet
 * @route   POST /api/pets
 * @access  Public
 */
export const createPet = async (req, res) => {
  try {
    const { name, type, owner } = req.body;

    // Validate required fields
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and type for the pet'
      });
    }

    // Create the pet
    const pet = await Pet.create({
      name,
      type,
      owner: owner || null
    });

    // If an owner ID was provided, attach this pet to the User's pets list
    if (owner) {
      const user = await User.findById(owner);
      if (user) {
        user.pets.push(pet._id);
        await user.save();
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Pet created successfully',
      data: pet
    });
  } catch (error) {
    console.error('Error in createPet controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating pet',
      error: error.message
    });
  }
};
