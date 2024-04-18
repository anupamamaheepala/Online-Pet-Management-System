const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/MakeAppointmentController');

// Route to handle appointment creation
router.post('/appointments', appointmentController.createAppointment);

// Route to handle fetching appointments
router.get('/appointments', appointmentController.getAppointments);

// Route to handle deleting an appointment
router.delete('/appointments/:id', appointmentController.deleteAppointment);

// Route to handle updating an appointment
router.put('/appointments/:id', appointmentController.updateAppointment);

// Add the PUT route
router.put('/appointments/:id', async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const { IsAccept } = req.body;
  
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { IsAccept },
        { new: true }
      );
  
      if (updatedAppointment) {
        res.json(updatedAppointment);
      } else {
        res.status(404).json({ error: 'Appointment not found' });
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  

module.exports = router;
