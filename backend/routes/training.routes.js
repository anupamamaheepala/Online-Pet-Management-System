const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path'); 
const trainingController = require('../controller/training.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/')); 
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
    updateInstructor,
    deleteprogram,
    rejectTraining,
    approveTraining,
    getapplicationdisplay,
    //updateTrainingStatus
} = require("../controller/training.controller");

router.post('/insert', upload.single('file'), addTrainingprogram);
router.get('/all', getalltrainings);
router.get('/:id', getalltrainingdetails);
//router.put('/updateInstructor/:id', updateInstructor);
router.put('/updateInstructor/:id', trainingController.updateInstructor);
router.delete('/delete/:id', deleteprogram); 
//router.put('/status/:id', updateTrainingStatus);

//reject
router.put('/reject/:id', trainingController.rejectTraining);
router.put('/approve/:id', trainingController.approveTraining);

router.get('/:id',trainingController.getapplicationdisplay);



module.exports = router;
