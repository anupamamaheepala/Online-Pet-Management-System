const trainingModel = require("../models/trainingModel");

// Add Training Program
const addTrainingprogram = async (req, res) => {
    try {
        const { ownerName, address, contact, dogName, breed, age } = req.body;

        const trainingData = {
            ownerName: ownerName,
            address: address,
            contact: contact,
            dogName: dogName,
            breed: breed,
            age: age,
        };

        const newTrainingObj = new trainingModel(trainingData);
        await newTrainingObj.save();

        return res.status(200).send({
            status: true,
            message: "Data saved successfully",
        });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ message: "Failed to add data" });
    }
};

// Get all trainings
const getalltrainings = async (req, res) => {
    try {
        const trainings = await trainingModel.find();
        res.json(trainings);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

// Get training details by ID
const getalltrainingdetails = async (req, res) => {
    const trainingId = req.params.id;

    try {
        const training = await trainingModel.findById(trainingId);
        
        if (!training) {
            return res.status(404).json({ message: "Training not found" });
        }

        res.json(training);
    } catch (error) {
        console.error('Error fetching training details:', error);
        res.status(500).json({ message: 'Failed to fetch training details' });
    }
};

// Update instructor for a training
const updateinstructor = async (req, res) => {
    const trainingId = req.params.id;
    const { instructor } = req.body;

    try {
        if (!instructor) {
            return res.status(400).json({ message: "Instructor name is required" });
        }

        const updatedTraining = await trainingModel.findByIdAndUpdate(trainingId, { instructor }, { new: true });

        if (!updatedTraining) {
            return res.status(404).json({ message: "Training not found" });
        }
        
        res.status(200).json({ message: "Instructor updated successfully", updatedTraining });
    } catch (error) {
        console.error('Error updating instructor:', error);
        res.status(500).json({ message: 'Failed to update instructor' });
    }
};

// Delete training by ID
const deleteprogram = async (req, res) => {
    const trainingId = req.params.id;

    try {
        const deletedTraining = await trainingModel.findByIdAndDelete(trainingId);
        
        if (!deletedTraining) {
            return res.status(404).json({ message: "Training not found" });
        }

        res.status(200).json({ message: "Training deleted successfully" });
    } catch (error) {
        console.error('Error deleting training:', error);
        res.status(500).json({ message: 'Failed to delete training' });
    }
};

module.exports = {
    addTrainingprogram,
    getalltrainings,
    getalltrainingdetails,
    updateinstructor,
    deleteprogram
};
