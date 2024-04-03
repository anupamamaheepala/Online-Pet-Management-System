const express = require("express");
const router = express.Router();
const {
    addTrainingprogram,
    getalltrainings,
    getalltrainingdetails,
    updateinstructor,
    deleteprogram,
} = require("../controller/training.controller");

router.post('/insert', addTrainingprogram);
router.get('/all', getalltrainings);
router.get('/:id', getalltrainingdetails);
router.put('/updateInstructor/:id', updateinstructor); // Ensure the path includes ':id' parameter
router.delete('/delete/:id', deleteprogram); // Ensure the path includes ':id' parameter

module.exports = router;
