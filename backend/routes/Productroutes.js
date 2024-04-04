const express = require("express");
const router = express.Router();
const { validateProduct, Product } = require("../models/ProductCatalog");

// Create a new product
router.post('/add', async (req, res) => {
    try {
        // Validate the incoming product data
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Create a new product object
        const product = new Product({
            itemName: req.body.itemName,
            category: req.body.category,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price
        });

        // Save the product to the database
        const savedProduct = await product.save();

        // Send the saved product as the response
        res.send(savedProduct);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Read all products
exports.getAddedProduct = async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

// Read one product by ID
router.get('/:id', async (req, res) => {
    try {
        // Find the product by ID in the database
        const product = await Product.findById(req.params.id);
        
        // If the product is not found, return a 404 error
        if (!product) return res.status(404).send('Product not found');

        // Send the product as the response
        res.send(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        // Validate the incoming product data
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Find and update the product by ID
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the product is not found, return a 404 error
        if (!updatedProduct) return res.status(404).send('Product not found');

        // Send the updated product as the response
        res.send(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find and delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        // If the product is not found, return a 404 error
        if (!deletedProduct) return res.status(404).send('Product not found');

        // Send the deleted product as the response
        res.send(deletedProduct);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
