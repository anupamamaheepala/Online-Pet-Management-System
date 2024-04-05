const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders, deleteOrderById } = require('../controller/OrderController');

// Route to handle adding a new order
router.post('/add', addOrder);

// Route to get all orders
router.get('/all', getAllOrders);

// Route to delete an order by ID
router.delete('/:id', deleteOrderById);

module.exports = router;
