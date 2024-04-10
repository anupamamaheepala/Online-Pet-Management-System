// routes/petRoute.js
const express = require('express');
const router = express.Router();
const petController = require('../controller/petController');
const Pet = require('../models/petModel');

  
// Route to add a new pet
router.post('/add', petController.addPet);

// // Route to fetch all pets with owners
router.get('/all-pets', petController.getAllPets);

// Route to fetch all pets of a customer
router.get('/my-pets/:customerId', petController.getCustomerPets);

// Route to fetch pet profile
router.get('/:petId', petController.getPetById);

// Route to delete a pet profile
router.delete('/:petId', petController.deletePetById);

// Route to update pet profile
router.put('/:petId', petController.updatePetById);


module.exports = router;




