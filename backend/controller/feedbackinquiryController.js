const FeedbackInquiry = require('../models/feedbackinquirymodel');

const saveFeedback = async (req, res) => {
  try {
    const { feedback, email, name } = req.body;
    const newFeedback = new FeedbackInquiry({
      inquiry,
      email,
      name,
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving feedback' });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await FeedbackInquiry.findByIdAndDelete(id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting feedback' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackInquiry.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving feedback' });
  }
};


const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback, email, name, reply } = req.body;

    // Check if the feedback exists
    const existingFeedback = await FeedbackInquiry.findById(id);
    if (!existingFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Update the feedback fields
    existingFeedback.inquiry = inquiry;
    existingFeedback.email = email;
    existingFeedback.name = name;
    existingFeedback.reply = reply;

    // Save the updated feedback
    await existingFeedback.save();

    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating feedback' });
  }
};

module.exports = {
  saveFeedback,
  deleteFeedback,
  getFeedback,
  updateFeedback
};
