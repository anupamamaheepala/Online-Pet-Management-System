const Pet = require('../models/petModel');
const customer = require('../models/registerModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const petId = req.params.petId;
    const fileName = `${petId}_${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });


exports.addPet = async (req, res) => {
  try {
      // Destructure the required fields from the request body
      const { petName, species, breed, ageValue, ageUnit, gender, weight, dateAdopted, additionalNotes, vaccinations, owner } = req.body;

      
      if (ageValue === undefined || ageUnit === undefined) {
          return res.status(400).json({ message: 'ageValue and ageUnit are required.' });
      }

      // Create a new pet instance using the request body values
      const newPet = new Pet({
          petName,
          species,
          breed,
          age: {
              value: parseFloat(ageValue), 
              unit: ageUnit, 
          },
          gender,
          weight: parseFloat(weight),
          dateAdopted,
          additionalNotes,
          vaccinations,
          owner,
      });

      // Save the new pet to the database
      await newPet.save();
      console.log('Pet saved successfully:', newPet);

      res.status(201).json({ message: 'Pet added successfully' });
  } catch (error) {
      console.error('Error saving pet:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

    exports.getCustomerPets = async (req, res) => {
      try {
        const customerId = req.params.customerId;
        if (!customerId) {
          return res.status(400).json({ message: 'Customer ID is missing' });
        }
    
        const pets = await Pet.find({ owner: customerId });
    
        const formattedPets = pets.map(pet => {
          if (pet.profilePhoto) {
            pet.profilePhoto = `${req.protocol}://${req.get('host')}/${pet.profilePhoto}`;
          }
          return pet;
        });
    
        res.status(200).json(formattedPets);
      } catch (error) {
        console.error('Error fetching customer pets:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    
    

    exports.getPetById = async (req, res) => {
      try {
        const petId = req.params.petId;
        const pet = await Pet.findById(petId);
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
        // Construct the full URL for the profile photo
        if (pet.profilePhoto) {
          pet.profilePhoto = `${req.protocol}://${req.get('host')}/${pet.profilePhoto}`;
        }
        res.status(200).json(pet);
      } catch (error) {
        console.error('Error fetching pet by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    

exports.deletePetById = async (req, res) => {
  try {
    const petId = req.params.petId;
    const deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Extract customerId from the owner field of the deleted pet
    const customerId = deletedPet.owner;

    res.status(200).json({ message: 'Pet deleted successfully', customerId });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


    // Controller function to update a pet profile
exports.updatePetById = async (req, res) => {
  try {
    const petId = req.params.petId;
    const updatedPetData = req.body; 
    const updatedPet = await Pet.findByIdAndUpdate(petId, updatedPetData, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet updated successfully', updatedPet });
  } catch (error) {
    console.error('Error updating pet profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function to get all pet details with owner
exports.getAllPets = async (req, res) => {
  try {
    // Fetch all pets
    const pets = await Pet.find();

    // Fetch owner details for each pet
    const populatedPets = await Promise.all(pets.map(async (pet) => {
      // Assuming the owner field is a reference to the Customer model
      const owner = await customer.findById(pet.owner);
      if (!owner) {
        // Handle case where owner is null or undefined
        return {
          ...pet.toObject(),
          owner: {
            name: 'Unknown',
            email: 'Unknown'
          },
          profilePhoto: pet.profilePhoto ? `${req.protocol}://${req.get('host')}/${pet.profilePhoto}` : ''
        };
      }
      // Combine pet data with owner data
      return {
        ...pet.toObject(),
        owner: {
          name: owner.username || 'Unknown',
          email: owner.email || 'Unknown'
        },
        profilePhoto: pet.profilePhoto ? `${req.protocol}://${req.get('host')}/${pet.profilePhoto}` : ''
      };
    }));

    res.status(200).json(populatedPets);
  } catch (error) {
    console.error('Error fetching all pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.uploadPetProfilePhoto = [upload.single('profilePhoto'), async (req, res) => {
  try {
    const { petId } = req.params;
    const profilePhotoPath = req.file.path.replace(/\\/g, '/'); // Normalize the file path

    // Update the pet's profile photo URL
    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { profilePhoto: profilePhotoPath },
      { new: true } // Return the updated document
    );

    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Create the full URL for the profile photo
    const profilePhotoURL = `${req.protocol}://${req.get('host')}/${profilePhotoPath}`;
    
    // Send the new profile photo URL in the response
    res.status(200).json({ profilePhoto: profilePhotoURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}];

exports.deletePetProfilePhoto = async (req, res) => {
  try {
    const { petId } = req.params;

    // Fetch the pet from the database
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Get the profile photo path
    const profilePhotoPath = pet.profilePhoto;

    // If there is a profile photo, delete it from the file system
    if (profilePhotoPath) {
      const filePath = path.join(__dirname, '..', profilePhotoPath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting profile photo:', err);
        }
      });
    }

    // Update the pet's profile photo to an empty string
    pet.profilePhoto = '';
    await pet.save();

    res.status(200).json({ message: 'Profile photo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
