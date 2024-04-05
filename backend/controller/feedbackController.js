const Feedback = require('../models/feedbackmodel');

const addFeedback = async (req, res) => {
  // Destructuring request body into its components
  const { feedback, email, name, rating } = req.body;

  try {
    // Check if all required fields are present
    if (!feedback || !email || !name || !rating) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Create a new feedback instance
    const newFeedback = new Feedback({
      feedback,
      email,
      name,
      rating
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Send success response
    res.status(200).json({ message: 'Feedback added successfully' });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  addFeedback
};