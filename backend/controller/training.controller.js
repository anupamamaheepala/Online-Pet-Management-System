const express = require('express');

const multer = require('multer'); // Import multer
const trainingModel = require('../models/trainingModel');

// Add Training Program
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// Add Training Program with file upload
const addTrainingprogram = async (req, res) => {
    try {
        const { ownerName, address, contact, dogName, breed, age } = req.body;

        // Capture current date and time
        const submissionDateTime = new Date();

        const trainingData = {
            ownerName: ownerName,
            address: address,
            contact: contact,
            dogName: dogName,
            breed: breed,
            age: age,
            submissionDateTime: submissionDateTime // Include submission date and time
        };

        const newTrainingObj = new trainingModel(trainingData);

        if (req.file) {
            newTrainingObj.filePath = path.basename(req.file.path); // Add file path to training object
            
        }

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
//display details after submission

const getapplicationdisplay = async (req, res) => {
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

const path=require('path');

//getalltrainingdetails
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


/* Update instructor for a training*/
// Update controller function to add instructor
const updateInstructor = async (req, res) => {
    const { id } = req.params;
    const { instructorId, instructorName } = req.body;
  
    try {
      const training = await trainingModel.findById(id);
      if (!training) {
        return res.status(404).json({ message: 'Training not found' });
      }
  
      // Update training details with trainer's name and ID
      training.instructorId = instructorId;
      training.instructorName = instructorName;
  
      // Save the updated training details
      await training.save();
  
      res.status(200).json({ message: 'Trainer updated successfully' });
    } catch (error) {
      console.error('Error updating training:', error);
      res.status(500).json({ message: 'Internal server error' });
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

//update training status
const updateTrainingStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const training = await trainingModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.json(training);
    } catch (error) {
        console.error('Error updating training status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update training status to "rejected"
const approveTraining = async (req, res) => {
    const { id } = req.params;
    try {
        const training = await trainingModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.json({ message: 'Training approved successfully' });
    } catch (error) {
        console.error('Error approving training:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const rejectTraining = async (req, res) => {
    const { id } = req.params;
    try {
        const training = await trainingModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.json({ message: 'Training rejected successfully' });
    } catch (error) {
        console.error('Error rejecting training:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports = {
    addTrainingprogram,
    getalltrainings,
    getalltrainingdetails,
    /*npm start updateInstructor*/
    deleteprogram,
    /*updateTrainingStatus*/
    updateInstructor,

    //reject updation
    rejectTraining,
    approveTraining,
    getapplicationdisplay,

};
