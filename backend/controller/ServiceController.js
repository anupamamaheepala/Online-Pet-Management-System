// ServiceController.js (Controller)
const Services = require('../models/serviceModel');

const createService = async (req, res) => {
  try {
    const { title, type, description } = req.body;
    const service = new Services({ title, type, description });
    await service.save();
    res.status(201).json({ message: 'Service created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
};
