const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const path = require('path'); // Import path module


const {
    gettrainingimage
  
  
} = require("../controller/uploadController");


router.get('/:id', gettrainingimage);


module.exports = router;
