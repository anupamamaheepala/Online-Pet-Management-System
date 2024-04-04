const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const path = require('path'); // Import path module
const trainingController = require('../controller/training.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/')); // Adjusted destination path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const {
    addTrainingprogram,
    getalltrainings,
    getalltrainingdetails,
    /* updateInstructor,*/
    deleteprogram,
    //updateTrainingStatus
} = require("../controller/training.controller");

router.post('/insert', upload.single('file'), addTrainingprogram);
router.get('/all', getalltrainings);
router.get('/:id', getalltrainingdetails);
//router.put('/updateInstructor/:id', updateInstructor); // Ensure the path includes ':id' parameter
router.delete('/delete/:id', deleteprogram); // Ensure the path includes ':id' parameter
//router.put('/status/:id', updateTrainingStatus);

module.exports = router;
