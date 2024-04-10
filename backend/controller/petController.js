// // controllers/petController.js
// const Pet = require('../models/petModel');

// // Controller function to add a new pet
// exports.addPet = async (req, res) => {
//   try {
//     const { name, species, breed, age, ownerId } = req.body;
//     const pet = new Pet({
//       name,
//       species,
//       breed,
//       age,
//       owner: ownerId
//     });
//     await pet.save();
//     res.status(201).json({ message: 'Pet added successfully', pet });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Controller function to get all pets of a specific customer
// exports.getPetsByCustomer = async (req, res) => {
//   try {
//     const customerId = req.params.customerId;
//     const pets = await Pet.find({ owner: customerId });
//     res.json(pets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Controller function to update a pet
// exports.updatePet = async (req, res) => {
//   try {
//     const petId = req.params.petId;
//     const updates = req.body;
//     const updatedPet = await Pet.findByIdAndUpdate(petId, updates, { new: true });
//     res.json({ message: 'Pet updated successfully', pet: updatedPet });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Controller function to delete a pet
// exports.deletePet = async (req, res) => {
//   try {
//     const petId = req.params.petId;
//     await Pet.findByIdAndDelete(petId);
//     res.json({ message: 'Pet deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }


// petController.js

const Pet = require('../models/petModel');
const customer = require('../models/registerModel');
// Controller function for adding a new pet
exports.addPet = async (req, res) => {
  try {
    const { petName, species, breed, age,gender,weight, owner } = req.body;
    console.log('Request body:',req.body); // Log the request body to check if it's received correctly

    // Create a new pet instance
    const newPet = new Pet({
      petName,
      species,
      breed,
      age,
      gender,
      weight,
      owner
    });    

    // Save the new pet to the database
    await newPet.save();
    console.log('Pet saved successfully:', newPet); 

    res.status(201).json({ message: 'Pet added successfully' });
  } catch (error) {
    console.error('Error saving pet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

    // Controller function to fetch all pets of a customer
    exports.getCustomerPets = async (req, res) => {
      try {
        const customerId = req.params.customerId;
        const pets = await Pet.find({ owner: customerId });
        res.status(200).json(pets);
      } catch (error) {
        console.error('Error fetching customer pets:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    // Controller function to fetch pet profile
    exports.getPetById = async (req, res) => {
      try {
        const petId = req.params.petId;
        console.log('Pet ID:', petId);
        const pet = await Pet.findById(petId);
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
      } catch (error) {
        console.error('Error fetching pet by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    // Controller function to delete a pet profile
exports.deletePetById = async (req, res) => {
  try {
    const petId = req.params.petId;
    const deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

    // Controller function to update a pet profile
exports.updatePetById = async (req, res) => {
  try {
    const petId = req.params.petId;
    const updatedPetData = req.body; // Assuming the entire pet data is sent for update
    const updatedPet = await Pet.findByIdAndUpdate(petId, updatedPetData, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet updated successfully', updatedPet });
  } catch (error) {
    console.error('Error updating pet profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAllPets = async (req, res) => {
  try {
    // Fetch all pets
    const pets = await Pet.find();

    // Fetch owner details for each pet
    const populatedPets = await Promise.all(pets.map(async (pet) => {
      // Assuming the owner field is a reference to the Customer model
      const owner = await customer.findById(pet.owner);
      // Combine pet data with owner data
      return {
        ...pet.toObject(),
        owner: {
          name: owner.username,
          email: owner.email
        }
      };
    }));

    res.status(200).json(populatedPets);
  } catch (error) {
    console.error('Error fetching all pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

