const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const advertisementController = require("../controller/advertisementController");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/')); // Adjusted destination path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to add a new advertisement with file upload
router.post('/add', upload.single('file'), advertisementController.addAdvertisement);

// Route to retrieve all advertisements
router.get("/", advertisementController.getAllAdvertisements);

// Route to delete an advertisement by ID
router.delete("/:id", advertisementController.deleteAdById);

module.exports = router;
