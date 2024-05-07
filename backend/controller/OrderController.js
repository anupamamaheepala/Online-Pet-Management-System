const Order = require('../models/OrderModel');
const moment = require('moment');


const addOrder = async (req, res) => {
  try {
    const {
      orderName,
      orderContactNo,
      orderAddress
    } = req.body;

    // Calculate delivery date (5 working days from the current date)
    const deliveryDate = moment().add(5, 'days').format('YYYY-MM-DD');

    // Create a new order object
    const newOrder = new Order({
      orderName,
      orderContactNo,
      orderAddress,
      deliveryDate 
    });

    // Save the new order object to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder); // Send back the saved order data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Controller function to handle getting all orders
const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const allOrders = await Order.find();
    res.status(200).json(allOrders); // Send back the order data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to handle deleting an order by ID
const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID and delete it
    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  deleteOrderById
};
