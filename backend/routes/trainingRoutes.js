const express = require("express");
const router = express.Router();
const Training = require("../models/trainingModel");


router.post("/insert", async (req, res) => {
  const {
    ownerName,
    address,
    contact,
    dogName,
    breed,
    age
  } = req.body;

  try {
    if (!address || !contact || !dogName || !breed || !age) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newTraining = new Training({
      ownerName,
      address,
      contact,
      dogName,
      breed,
      age
    });

    await newTraining.save();
    res.status(200).json({ message: "Data added" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "Failed to add data" });
  }
});


router.get('/all', async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

// Route to fetch training details by ID
router.get("/:id", async (req, res) => {
  const trainingId = req.params.id;

  try {
    // Find the training document by ID
    const training = await Training.findById(trainingId);
    
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Return the training details as JSON response
    res.json(training);
  } catch (error) {
    // Handle errors
    console.error('Error fetching training details:', error);
    res.status(500).json({ message: 'Failed to fetch training details' });
  }
});

// Route to update instructor for a training
router.put("/updateInstructor/:id", async (req, res) => {
  const trainingId = req.params.id;
  const { instructor } = req.body;

  try {
    if (!instructor) {
      return res.status(400).json({ message: "Instructor name is required" });
    }

    const updatedTraining = await Training.findByIdAndUpdate(trainingId, { instructor }, { new: true });

    if (!updatedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }
    
    res.status(200).json({ message: "Instructor updated successfully", updatedTraining });
  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).json({ message: 'Failed to update instructor' });
  }
});


// In your backend routes file (e.g., trainingRoutes.js)

router.delete("/delete/:id", async (req, res) => {
  const trainingId = req.params.id;

  try {
    // Find the training document by ID and delete it
    const deletedTraining = await Training.findByIdAndDelete(trainingId);
    
    if (!deletedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Optionally, you can send a success message
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    console.error('Error deleting training:', error);
    res.status(500).json({ message: 'Failed to delete training' });
  }
});



module.exports = router;
