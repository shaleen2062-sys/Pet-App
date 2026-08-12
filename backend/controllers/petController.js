const pet = require("../models/pet");

const createPet = async (req,res) => {
    try{
        const {name, type, background} = res.body;
        if(!name || !type ){
            return res.status(400).json({message:"Name and Pet Type are required"});
        }
        const newPet = await pet.create({
            
        })
    }catch{

    }
}