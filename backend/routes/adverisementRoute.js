//advertisementRoute.js

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

router.get("/confirmedads", advertisementController.getAllConfirmedAdvertisements);

router.delete("/confirmedads/:id", advertisementController.deletecomAdById);

router.get('/:id', advertisementController.getAdvertisementById);

router.put('/:id', advertisementController.updateAdvertisementById);

router.get("/user/:userId", advertisementController.getAdvertisementsByUserId);

module.exports = router;