// Assuming you're using Express.js for your backend

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9000;

// Sample products data
const products = [
    { _id: 1, itemName: "Product 1", price: 10, quantity: 5 },
    { _id: 2, itemName: "Product 2", price: 20, quantity: 3 },
    // Add more products as needed
];

// Initialize an empty cart
let cart = [];

app.use(bodyParser.json());

// Route to add items to the cart
app.post('/Cart', (req, res) => {
    const productId = req.body.productId;

    // Find the product in the products array
    const productToAdd = products.find(product => product._id === productId);

    if (!productToAdd) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Add the product to the cart
    cart.push(productToAdd);

    res.status(200).json({ message: "Product added to cart successfully", cart });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
