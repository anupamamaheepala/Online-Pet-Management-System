const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); // Import multer for file uploads

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/advertisementDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Advertisement schema
const advertisementSchema = new mongoose.Schema({
    title: String,
    breed: String,
    purpose: String,
    description: String,
    picture: String,
    price: Number,
    contact: String
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Handle form submission
app.post('/submitAdvertisement', upload.single('picture'), async (req, res) => {
    try {
        const advertisement = new Advertisement({
            title: req.body.title,
            breed: req.body.breed,
            purpose: req.body.purpose,
            description: req.body.description,
            picture: req.file ? req.file.path : '', // Assuming 'picture' is the name of the file input
            price: req.body.price,
            contact: req.body.contact
        });
        await advertisement.save();
        res.send('Advertisement added successfully!');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
