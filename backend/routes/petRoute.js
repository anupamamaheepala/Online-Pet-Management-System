// routes/petRoute.js
const express = require('express');
const router = express.Router();
const petController = require('../controller/petController');

  
// Route to add a new pet
router.post('/add', petController.addPet);

// Route to fetch all pets of a customer
router.get('/my-pets/:customerId', petController.getCustomerPets);

// Route to fetch pet profile
router.get('/:petId', petController.getPetById);


module.exports = router;



// // Route to get all pets of a specific customer
// router.get('/customer/:customerId', petController.getPetsByCustomer);

// // Route to update a pet
// router.put('/:petId', petController.updatePet);

// // Route to delete a pet
// router.delete('/:petId', petController.deletePet);|
// // POST route to add a new pet
// router.post('/add', async (req, res) => {
//     try {
//       const { name, breed, age, ownerId } = req.body;
//       const newPet = new Pet({
//         name,
//         breed,
//         age,
//         ownerId
//       });
//       const savedPet = await newPet.save();
//       res.status(201).json(savedPet);
//     } catch (error) {
//       console.error('Error adding pet:', error);
//       res.status(500).json({ message: 'Failed to add pet' });
//     }
//   });
