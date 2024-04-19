const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const advertisementController = require("../controller/advertisementController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('file'), advertisementController.addAdvertisement);
router.get("/", advertisementController.getAllAdvertisements);
router.put("/:id/confirm", upload.single('file'), advertisementController.confirmAdvertisement);
router.delete("/:id", advertisementController.deleteAdById);
//router.get("/confirmed", advertisementController.getConfirmedAdvertisements);
//router.get("/:id/confirm", advertisementController.confirmAdvertisement); // GET endpoint for confirming advertisements

router.get("/confirmedads", advertisementController.getAllConfirmedAdvertisements);

// DELETE route for deleting an advertisement by ID
router.delete("/confirmedads/:id", advertisementController.deletecomAdById);


router.put('/confirmedads/:id', upload.single('filePath'), confirmedadsController.updateConfirmedAd);


module.exports = router;