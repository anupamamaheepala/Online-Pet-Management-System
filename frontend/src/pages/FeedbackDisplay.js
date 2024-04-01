import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackdisplay.css';

function FeedbackDisplay() {
  // Mock data for feedback
  const feedbackData = [
    { id: 1, feedback: 'Great app, loved it!', rating: 5 },
    { id: 2, feedback: 'Needs some improvements', rating: 3 },
    { id: 3, feedback: 'Good work!', rating: 4 },
  ];

  // Function to handle updating feedback
  const handleUpdateFeedback = (id) => {
    // Implement your update feedback logic here
    console.log('Updating feedback with id:', id);
  };

  // Function to handle deleting feedback
  const handleDeleteFeedback = (id) => {
    // Implement your delete feedback logic here
    console.log('Deleting feedback with id:', id);
  };

  return (
    <>
      <Header />
    <div className="feedback-display">
      <h2>Feedback Display</h2>
      <div className="feedback-list">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <p>{feedback.feedback}</p>
            <p>Rating: {feedback.rating}</p>
            <div className="feedback-buttons">
              <button onClick={() => handleUpdateFeedback(feedback.id)}>Update</button>
              <button onClick={() => handleDeleteFeedback(feedback.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default FeedbackDisplay;
