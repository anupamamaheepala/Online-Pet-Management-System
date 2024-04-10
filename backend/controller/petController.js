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
