const express = require('express');
const router = express.Router();
const ServiceController = require('../controller/ServiceController');


//Creare a new service
router.post('/add', ServiceController.createService);


//Fetch all services
router.get('/services', ServiceController.getAllServices);

// DELETE route to delete a service by ID
router.delete('/delete/:id', ServiceController.deleteService);


module.exports = router;
