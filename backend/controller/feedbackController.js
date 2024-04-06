const Feedback = require('../models/feedbackmodel');

const addFeedback = async (req, res) => {
  const { feedback, email, name, rating } = req.body;

  try {
    if (!feedback || !email || !name || !rating) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const newFeedback = new Feedback({
      feedback,
      email,
      name,
      rating
    });

    await newFeedback.save();

    res.status(200).json({ message: 'Feedback added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    await Feedback.findByIdAndDelete(feedbackId);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  const { feedback, email, name, rating } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, { feedback, email, name, rating }, { new: true });
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback updated successfully', updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const likeFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, { $inc: { likes: 1 } }, { new: true });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const dislikeFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, { $inc: { dislikes: 1 } }, { new: true });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const replyToFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  const { user, reply } = req.body;
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, { $push: { replies: { user, reply } } }, { new: true });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getCustomerFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({}, 'name feedback rating likes dislikes');
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  addFeedback,
  getAllFeedback,
  deleteFeedback,
  updateFeedback,
  likeFeedback,
  dislikeFeedback,
  replyToFeedback,
  getCustomerFeedback
};
