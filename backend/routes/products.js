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
        const timestamp = new Date().toISOString().replace(/:/g, '-'); 
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
    limits: { fileSize: 1024 * 1024 * 5 }, 
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


// Route to get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        // Fetch the product from the database by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to update a product
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        // Fetch the product from the database by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product fields based on the request body
        product.itemName = req.body.itemName;
        product.category = req.body.category;
        product.price = req.body.price;
        product.quantity = req.body.quantity;

        // Check if a new image is uploaded
        if (req.file) {
            product.image = req.file.path;
        }

        // Save the updated product to the database
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
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
        res.status(500).json({ message: 'Failed to delete product' });
    }
});



module.exports = router;
