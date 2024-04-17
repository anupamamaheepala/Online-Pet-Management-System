const Ads = require("../models/advertisementModel");
const ConfirmedAds = require("../models/advertisementModel");

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

exports.confirmAdvertisement = async (req, res) => {
    try {
        const adId = req.params.id;
        const ad = await Ads.findById(adId);
        
        if (!ad) {
            return res.status(404).json({ message: "Advertisement not found" });
        }

        // Create a new confirmed advertisement document
        const confirmedAd = new ConfirmedAds({
            ownerName: ad.ownerName,
            email: ad.email,
            title: ad.title,
            Breed: ad.Breed,
            purpose: ad.purpose,
            description: ad.description,
            filePath: ad.filePath,
            contact: ad.contact,
            createdAt: ad.createdAt // Optionally, copy creation date from the original advertisement
        });

        // Save the confirmed advertisement to the database
        await confirmedAd.save();

        // Delete the advertisement from the original collection
        await Ads.findByIdAndDelete(adId);

        res.status(200).json({ message: "Advertisement confirmed and moved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

