const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const stepController = require('../controller/stepController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

// Route to add a new step
router.post('/adds', upload.single('file'), stepController.addStep);
router.get('/getss',stepController.getStep);

//get by id
router.get('/:id',stepController.getStepId);
router.put('/:id', upload.single('file'),stepController.editstep);

module.exports = router;
