
const Services = require('../models/serviceModel');


//Create a new Service
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
// Fetch all services
const getAllServices = async (req, res) => {
    try {
      const services = await Services.find();
      res.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const deleteService = async (req, res) => {
    try {
      const deletedService = await Services.findByIdAndDelete(req.params.id);
      if (!deletedService) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  module.exports = {
    createService,
    getAllServices,
    deleteService,
  };

