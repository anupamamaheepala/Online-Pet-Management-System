const express = require('express');

const multer = require('multer'); 
const trainingModel = require('../models/trainingModel');
const nodemailer = require('nodemailer');


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
        const { ownerName, email,  address, contact, dogName, breed, age } = req.body;

        // submitted date and time
        const submissionDateTime = new Date();

        const trainingData = {
            ownerName: ownerName,
            email: email,
            address: address,
            contact: contact,
            dogName: dogName,
            breed: breed,
            age: age,
            submissionDateTime: submissionDateTime 
        };

        const newTrainingObj = new trainingModel(trainingData);

        if (req.file) {
            newTrainingObj.filePath = path.basename(req.file.path); //changing file path to upload
            
        }

        const response=await newTrainingObj.save();

        return res.status(200).json(response);
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
// const approveTraining = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const training = await trainingModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
//         if (!training) {
//             return res.status(404).json({ message: 'Training not found' });
//         }
//         res.json({ message: 'Training approved successfully' });
//     } catch (error) {
//         console.error('Error approving training:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Function to send email
const sendEmail = async (recipientEmail, subject, message) => {
    try {
      const transporter = nodemailer.createTransport({
        // Configure your email provider here
        // Example: Gmail
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL, // Your email
          pass: process.env.TApassword, // Your password
        },
      });
  
      const mailOptions = {
        from: 'petzonemanagement@gmail.com',
        to: recipientEmail,
        subject: subject,
        html: message,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  };
  
  // Update training status to "approved"
  const approveTraining = async (req, res) => {
    const { id } = req.params;
    try {
        const training = await trainingModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }

        // Send email to customer
        const recipientEmail = training.email;
        const subject = 'Your Dog Training Application Has Been Approved!';
        const message = `
            <p>Dear ${training.ownerName},</p>
            <p>We are pleased to inform you that your application for dog training at Pet Zone Hospital has been approved!</p>
            <p>We would like to invite you to come to Pet Zone Hospital to meet with our training administration. This meeting will provide you with the opportunity to discuss any specific requirements or concerns you may have regarding your dog's training.</p>
            <p>Our training administration will be available to assist you in selecting the most suitable instructor for your dog. If, after meeting with the instructor, you feel the need to change instructors, please inform us, and we will make the necessary arrangements.</p>
            <p>During this meeting, our training administration will provide you with an easy-to-follow schedule and confirm the starting date for your dog's training sessions.</p>
            <p>We kindly request your presence at Pet Zone Hospital within the next two weeks for this meeting.</p>
            <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
            <p>We look forward to seeing you and your dog at Pet Zone Hospital soon!</p>
            <p>Best regards,</p>
            <p>Aswini Ranaviraja</p>
            <p>Training Manager</p>
            <p>Pet Zone Hospital</p>
        `;

        await sendEmail(recipientEmail, subject, message);

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
            // Send email to customer
      const recipientEmail = training.email; 
      const subject = 'Training Rejected';
      const message = `
        <h1>Your training is Rejected</h1>
        <p>Thank you for choosing PetZone Animal Hospital.</p>
        <p>Soory to say that your Application is rejected</p>
        <p>Schedule an appointment for health checkup </p>
      `;
      await sendEmail(recipientEmail, subject, message);
  
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
    deleteprogram,
    /*updateTrainingStatus*/
    updateInstructor,

    //reject updation
    rejectTraining,
    approveTraining,
    getapplicationdisplay,

};