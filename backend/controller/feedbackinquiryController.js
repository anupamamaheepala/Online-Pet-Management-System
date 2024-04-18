// // const FeedbackInquiry = require('../models/feedbackinquirymodel');

// // // Controller function to handle saving feedback data
// // const saveFeedback = async (req, res) => {
// //   try {
// //     const { feedback, email, name } = req.body;
// //     const newFeedback = new FeedbackInquiry({
// //       feedback,
// //       email,
// //       name,
// //     });
// //     await newFeedback.save();
// //     res.status(201).json({ message: 'Feedback saved successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'An error occurred while saving feedback' });
// //   }
// // };

// // module.exports = {
// //   saveFeedback
// // };
// const FeedbackInquiry = require('../models/feedbackinquirymodel');

// // Controller function to handle saving feedback data
// const saveFeedback = async (req, res) => {
//   try {
//     const { feedback, email, name } = req.body;
//     const newFeedback = new FeedbackInquiry({
//       feedback,
//       email,
//       name,
//     });
//     await newFeedback.save();
//     res.status(201).json({ message: 'Feedback saved successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while saving feedback' });
//   }
// };

// module.exports = {
//   saveFeedback
// };
const FeedbackInquiry = require('../models/feedbackinquirymodel');

// Controller function to handle saving feedback data
const saveFeedback = async (req, res) => {
  try {
    const { feedback, email, name } = req.body;
    const newFeedback = new FeedbackInquiry({
      feedback,
      email,
      name,
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving feedback' });
  }
};

// Controller function to handle retrieving all feedback data
const getFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackInquiry.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving feedback' });
  }
};

module.exports = {
  saveFeedback,
  getFeedback
};