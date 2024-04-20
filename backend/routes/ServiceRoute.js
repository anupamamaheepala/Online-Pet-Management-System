const express = require('express');
const router = express.Router();
const ServiceController = require('../controller/ServiceController');




//Creare a new service
router.post('/add', ServiceController.createService);


//Fetch all services
router.get('/services', ServiceController.getAllServices);

module.exports = router;
