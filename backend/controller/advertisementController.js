//advertisementController.js

const Ads = require("../models/advertisementModel");
const ConfirmedAds = require("../models/confirmedAdsModel");

exports.addAdvertisement = async (req, res) => {
    try {
        const {
            ownerName,
            email,
            pet_type,
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
            pet_type,
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

exports.deletecomAdById = async (req, res) => {
    try {
        console.log("Deleting advertisement with ID:", req.params.id); // Log the ID
        const deletedAd = await ConfirmedAds.findByIdAndDelete(req.params.id);
        if (!deletedAd) {
            return res.status(404).json({ message: "Advertisement not found" });
        }
        res.status(200).json({ message: "Advertisement deleted successfully" });
    } catch (error) {
        console.error("Error deleting advertisement:", error); // Log any errors
        res.status(500).json({ message: "Failed to delete advertisement" });
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
            pet_type: ad.pet_type,
            Breed: ad.Breed,
            purpose: ad.purpose,
            description: ad.description,
            filePath: ad.filePath,
            contact: ad.contact,
            createdAt: ad.createdAt // creation date from the original advertisement
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


exports.getAllConfirmedAdvertisements = async (req, res) => {
    try {
        const confirmedAds = await ConfirmedAds.find();
        res.json(confirmedAds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateConfirmedAd = async (req, res) => {
    try {
      const updatedData = {
        ownerName: req.body.ownerName,
        email: req.body.email,
        pet_type: req.body.pet_type,
        Breed: req.body.Breed,
        purpose: req.body.purpose,
        description: req.body.description,
        contact: req.body.contact,
        filePath: req.file ? `uploads/${req.file.filename}` : req.body.filePath,
        
      };
  
      const confirmedAd = await ConfirmedAds.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
  
      if (!confirmedAd) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
      res.json(confirmedAd);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  exports.getAdvertisementById = async (req, res) => {
    try {
      const advertisement = await ConfirmedAds.findById(req.params.id);
      if (!advertisement) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
      res.json(advertisement);
    } catch (error) {
      console.error('Error fetching advertisement:', error);
      res.status(500).json({ message: 'Error fetching advertisement', error: error.message });
    }
  };
  
  // Controller function to update advertisement by ID
  exports.updateAdvertisementById = async (req, res) => {
    try {
        const updatedData = {
          ownerName: req.body.ownerName,
          email: req.body.email,
          pet_type: req.body.pet_type,
          Breed: req.body.Breed,
          purpose: req.body.purpose,
          description: req.body.description,
          contact: req.body.contact,
        };
    
        const confirmedAd = await ConfirmedAds.findByIdAndUpdate(
          req.params.id,
          updatedData,
          { new: true }
        );
    
        if (!confirmedAd) {
          return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.json(confirmedAd);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
};


exports.getAdvertisementsByUserId = async (req, res) => {
  try {
      const userId = req.params.userId;
      const advertisements = await Ads.find({ userId }); // Assuming userId is the field in the Ads model that represents the user ID
      res.json(advertisements);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
};
