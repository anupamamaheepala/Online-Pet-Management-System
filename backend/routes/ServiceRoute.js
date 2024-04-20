// ServicesRoute.js (Route)
const express = require('express');
const router = express.Router();
const ServiceController = require('../controller/serviceController');

router.post('/add', ServiceController.createService);

module.exports = router;
