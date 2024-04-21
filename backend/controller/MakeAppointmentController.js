const Appointment = require('../models/MakeAppointmentModel');
const Staff = require('../models/staffModel');


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

// Get the count of Vet appointments 
exports.getUnacceptedAppointmentsCount = async (req, res) => {
  try {
    const count = await Appointment.countDocuments({
      $and: [
        { IsAccept: false },
        { IsPaid: false },
        { selectService: 'Veterinary Service' }
      ]
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
// Get the count of Groome appointments
exports.getUnacceptedGroomingAppointmentsCount = async (req, res) => {
  try {
    const count = await Appointment.countDocuments({
      $and: [
        { IsAccept: false },
        { IsPaid: false },
        { selectService: 'Groome Service' }
      ]
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { isAccept, isPaid, selectService } = req.query;

    const filter = {};

    // Check if the query parameters are provided
    if (isAccept !== undefined) {
      filter.IsAccept = isAccept === 'true';
    }

    if (isPaid !== undefined) {
      filter.IsPaid = isPaid === 'true';
    }

    if (selectService) {
      filter.selectService = selectService;
    }

    const appointments = await Appointment.find(filter);
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller method to check availability
exports.checkAvailability = async (req, res) => {
  try {
    // Extract date, time, and service from the request body
    const { selectDate, selectTime, selectService } = req.body;

    // Parse the selectDate string to a Date object
    const date = new Date(selectDate);

    // Find appointments for the specified date, time, and service
    const existingAppointment = await Appointment.findOne({
      selectDate: date,
      selectTime,
      selectService,
    });

    // If an appointment already exists for the specified date, time, and service, it's not available
    if (existingAppointment) {
      return res.status(400).json({ error: 'Appointment slot not available. Please choose another time.' });
    }

    // If the appointment slot is available, respond with success
    res.json({ available: true });
  } catch (error) {
    // Handle any errors
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability. Please try again later.' });
  }
};


// Controller method to check availability
exports.checkAvailability = async (req, res) => {
  try {
    // Extract date, time, and service from the request body
    const { selectDate, selectTime, selectService } = req.body;

    // Parse the selectDate string to a Date object
    const date = new Date(selectDate);

    // Find appointments for the specified date, time, and service
    const existingAppointment = await Appointment.findOne({
      selectDate: date,
      selectTime,
      selectService,
    });

    // If an appointment already exists for the specified date, time, and service, it's not available
    if (existingAppointment) {
      return res.status(400).json({ error: 'Appointment slot not available. Please choose another time.' });
    }

    // If the appointment slot is available, respond with success
    res.json({ available: true });
  } catch (error) {
    // Handle any errors
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability. Please try again later.' });
  }
};

exports.getProfessions = async (req, res) => {
  try {
    // Fetch unique professions from the database
    const professions = await Staff.distinct('designation');

    // Map professions to format suitable for dropdown options
    const professionOptions = professions.map((profession) => ({
      value: profession,
      label: profession
    }));

    res.status(200).json(professionOptions);
  } catch (error) {
    console.error('Error fetching professions:', error);
    res.status(500).json({ error: 'Failed to fetch professions' });
  }
};