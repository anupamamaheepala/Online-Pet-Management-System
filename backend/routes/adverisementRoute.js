// advertisementRoute.js

const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const advertisementController = require("../controller/advertisementController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Adjusted destination path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('file'), advertisementController.addAdvertisement);
router.get("/", advertisementController.getAllAdvertisements);
router.get("/confirmed", advertisementController.getConfirmedAdvertisements); // New endpoint for confirmed advertisements
router.delete("/:id", advertisementController.deleteAdById);

module.exports = router;
