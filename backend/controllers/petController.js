const pet = require("../models/pet");

const createPet = async (req,res) => {
    try{
        const {name, type, background} = res.body;
        if(!name || !type ){
            return res.status(400).json({message:"Name and Pet Type are required"});
        }
        const newPet = await pet.create({
            
        });
        res.status(201).json(newPet);
    }catch(error){
        console.error(error);

        res.status(500).json({message:error.message || "Something went wrong", });

    }
};

module.exports = {
    createPet,
};