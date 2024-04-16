const trainingModel = require('../models/trainingModel');

const path = require('path');


const gettrainingimage = async (req, res) => {
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
            res.sendFile(path.join(__dirname, '..',"/uploads", training.filePath), {
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

module.exports = {
    gettrainingimage,
};
