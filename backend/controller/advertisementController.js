// advertisementController.js

const Ads = require("../models/advertisementModel");

exports.addAdvertisement = async (req, res) => {
    try {
        const {
            ownerName,
            email,
            title,
            Breed,
            purpose,
            description,
            contact,
        } = req.body;

        let filePath = null;
        if (req.file) {
            filePath = req.file.path;
        }

        const newAdvertisement = new Ads({
            ownerName,
            email,
            title,
            Breed,
            purpose,
            description,
            filePath,
            contact,
        });

        await newAdvertisement.save();
        res.status(201).json({ message: "Advertisement added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAllAdvertisements = async (req, res) => {
    try {
        const ads = await Ads.find();
        res.json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteAdById = async (req, res) => {
    try {
        await Ads.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Ad deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete ad" });
    }
};

exports.getConfirmedAdvertisements = async (req, res) => {
    try {
        const confirmedAds = await Ads.find({ confirmed: true }); // Assuming there's a "confirmed" field in your advertisement schema
        res.json(confirmedAds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};