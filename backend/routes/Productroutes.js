const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controller/ProductController');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const {
    addProduct,
    getAllProducts,
    getProductDetails,
    deleteProduct
} = require("../controller/ProductController");

// Routes for product CRUD operations
router.post('/add', upload.single('image'), addProduct);
router.get('/all', getAllProducts);
router.get('/:id', getProductDetails);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
