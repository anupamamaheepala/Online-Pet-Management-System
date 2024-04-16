const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().toISOString().replace(/:/g, '-'); // Replace colons with dashes
        cb(null, timestamp + '-' + file.originalname);
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

// Route to handle product addition
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { itemName, category, price, quantity } = req.body;
        const image = req.file.path;

        // Create new product instance
        const newProduct = new Product({
            itemName,
            category,
            image,
            price,
            quantity
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all products
router.get('/', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update product details
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { itemName, category, price, quantity } = req.body;
        let image = req.file ? req.file.path : req.body.image; // Use the new image if provided, otherwise keep the old one

        // Find the product by ID and update its details
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            itemName,
            category,
            image,
            price,
            quantity
        }, { new: true });

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
});

module.exports = router;
