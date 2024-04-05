const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

// Route to add a new order
router.post('/od', async (req, res) => {
    try {
        const { orderName, orderContactNo, orderAddress } = req.body;
        const newOrder = new Order({
            orderName,
            orderContactNo,
            orderAddress
        });
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all orders
router.get('/get', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific order by ID
router.get('/get:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Middleware function to get order by ID
async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

module.exports = router;
