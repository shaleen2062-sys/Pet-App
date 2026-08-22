const Pet = require("../models/pet");

const createPet = async (req, res) => {
  try {
    const { name, type, background } = req.body;
    if (!name || !type) {
      return res
        .status(400)
        .json({ message: "Name and Pet Type are required" });
    }
    const newPet = await Pet.create({
      userId: req.user._id,
      name,
      type,
      background,
    });
    res.status(201).json(newPet);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

const getPet = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      userId: req.user._id,
    });

    if (!pet) {
      return res.status(404).json({message: "Pet not found",});
    }

    return res.status(200).json(pet);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

const feedPet = async (req,res) => {
    try{
        const pet = await Pet.findOne({
            userId: req.user._id,
        });
        if (!pet){
            return res.status(404).json({
                message:"Pet Not Found",
            });
        }
        if (pet.hunger === 100) {
            return res.status(400).json({message: "Your pet is already full",});
        }

        pet.hunger = Math.min(pet.hunger +20,100);

        await pet.save();
        return res.status(200).json(pet);
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:error.message || "Something Went Wrong",
        });
    }
};

const playPet = async(req,res) =>{
    try{
        const pet = await Pet.findOne({
            userId: req.user._id
        })

        if(!pet){
            return res.status(404).json({message:"Pet Not Found"});
        }
        if(pet.energy === 0){
            return res.status(400).json({message:"Your pet is too tired to play"});
        }

        pet.hunger = Math.min(pet.hunger -20,100);
        pet.energy = Math.min(pet.energy -20,100);
        await pet.save();
        return res.status(200).json(pet);
    
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message || "Something Went Wrong"});
    }
};

const sleepPet = async(req,res) => {
    try{
        const pet = await Pet.findOne({
        userId: req.user._id
    })

    if(!pet){
        return res.status(404).json({message:"Pet Not Found"});
    }

    if(pet.energy === 100){
        return res.status(400).json({message:"Your pet is not tired"});
    }

    pet.hunger = Math.min(pet.hunger -20,100);
    pet.energy = Math.min(pet.energy +20,100);

    }catch(error){
        console.error(error);
        return res.status(500).json({message:error.message || "Something Went Wrong"});
    }
   
}


module.exports = {
  createPet,
  getPet,
  feedPet,
  sleepPet,
  playPet
};
