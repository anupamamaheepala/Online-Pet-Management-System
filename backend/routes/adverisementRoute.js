// adverisementRoute.js

const express = require("express");
const router = express.Router();
const advertisementController = require("../controller/advertisementController"); // Update this path

// Route to add a new advertisement
router.post("/add", advertisementController.addAdvertisement);

// Route to retrieve all advertisements
router.get("/", advertisementController.getAllAdvertisements);


// Route to delete an advertisement by ID
//router.delete("/:_id", advertisementController.deleteAdvertisementById);

// Route to delete an advertisement by ID
// router.delete("/:_id", advertisementController.deleteAdvertisementById);


module.exports = router;
