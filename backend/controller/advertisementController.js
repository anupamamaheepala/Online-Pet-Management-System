// advertisementController.js

const AdsSchema = require("../models/advertisementModel");

// Function to handle adding a new advertisement
const addAdvertisement = async (req, res) => {
  try {
    const {
      ownerName,
      email,
      title,
      Breed,
      purpose,
      description,
      price,
      contact,
    } = req.body;

    // Validations
    if (
      !ownerName ||
      !email ||
      !title ||
      !Breed ||
      !purpose ||
      !description ||
      !price ||
      !contact
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAdvertisement = new AdsSchema({
      ownerName,
      email,
      title,
      Breed,
      purpose,
      description,
      price,
      contact,
    });

    // Saving data into the database
    await newAdvertisement.save();
    res.status(201).json({ message: "Advertisement added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Function to retrieve all advertisements
const getAllAdvertisements = async (req, res) => {
  try {
    const ads = await AdsSchema.find();
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Function to delete an advertisement by ID
const deleteAdvertisementById = async (req, res) => {
  try {
    const userId = req.params.id;
    await AdsSchema.findByIdAndDelete(userId);
    res.status(200).send({ status: "Advertisement deleted" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ status: "Error with deleting advertisement", error: error.message });
  }
};

module.exports = {
  addAdvertisement,
  getAllAdvertisements,
  deleteAdvertisementById,
};