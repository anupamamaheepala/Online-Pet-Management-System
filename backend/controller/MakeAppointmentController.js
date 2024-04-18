const Appointment = require('../models/MakeAppointmentModel');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { ownerName, ownerEmail, ownerContact, petType, selectService, selectDate, selectTime, selectProfession} = req.body;

    // Check if required fields are provided
    if (!ownerName || !ownerEmail || !ownerContact || !petType || !selectService || !selectDate || !selectTime || !selectProfession ) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const parsedSelectDate = new Date(selectDate); // Parse selectDate as a Date object
    // Create a new appointment
    const newAppointment = new Appointment({
      ownerName,
      ownerEmail,
      ownerContact,
      petType,
      selectService,
      selectDate: parsedSelectDate,
      selectTime,
      selectProfession,
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment by id and remove it from the database
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointmentData = req.body;

    // Find the appointment by id and update it
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updatedAppointmentData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointmentData = req.body;

    // Find the appointment by id and update it
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updatedAppointmentData,
      { new: true } // To return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

