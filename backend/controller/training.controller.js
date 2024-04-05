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
            newTrainingObj.filePath = req.file.path; // Add file path to training object
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

//getalltrainingdetails
const path = require('path');

const getalltrainingdetails = async (req, res) => {
    const trainingId = req.params.id;

    try {
        const training = await trainingModel.findById(trainingId);

        if (!training) {
            return res.status(404).json({ message: "Training not found" });
        }

        // If the training has a file path, send the file as a response
        if (training.filePath) {
            // Get the file extension
            const fileExtension = path.extname(training.filePath).toLowerCase();
            
            // Set the appropriate content type based on file extension
            let contentType;
            if (fileExtension === '.pdf') {
                contentType = 'application/pdf';
            } else if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {
                contentType = 'image/jpeg'; // You can add support for other image types as well
            } else {
                // Unsupported file type
                return res.status(400).json({ message: "Unsupported file type" });
            }

            // Send the file as a response
            res.sendFile(path.join(__dirname, '..', training.filePath), {
                headers: {
                    'Content-Type': contentType
                }
            });
        } else {
            // If no file path is associated with the training, simply send the training details
            res.json(training);
        }
    } catch (error) {
        console.error('Error fetching training details:', error);
        res.status(500).json({ message: 'Failed to fetch training details' });
    }
};

/* Update instructor for a training
const updateInstructorById = async (req, res) => {
    try {
        const { id } = req.params;
        const { instructor } = req.body;
        const training = await trainingModel.findByIdAndUpdate(id, { instructor }, { new: true });
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.json(training);
    } catch (error) {
        console.error('Error updating instructor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};*/

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

module.exports = {
    addTrainingprogram,
    getalltrainings,
    getalltrainingdetails,
    /*npm start updateInstructor*/
    deleteprogram,
    /*updateTrainingStatus*/

};
