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
router.post("/:id/confirm", upload.single('file'),  advertisementController.confirmAdvertisement); // New endpoint for confirming advertisements
router.delete("/:id", advertisementController.deleteAdById);
//router.get("/confirmed", advertisementController.getConfirmedAdvertisements);
router.get("/:id/confirm", advertisementController.confirmAdvertisement); // GET endpoint for confirming advertisements

module.exports = router;

