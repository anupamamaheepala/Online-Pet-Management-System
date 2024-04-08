const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

// Initialize multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Import Product model
const Product = require('../models/Product');

// Route to handle product addition
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { itemName, category, description, price } = req.body;
        const image = req.file.path;

        // Create new product instance
        const newProduct = new Product({
            itemName,
            category,
            description,
            image,
            price
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
