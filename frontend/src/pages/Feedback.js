import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import '../Feedback.css';

function Feedback(){
        const [feedback, setFeedback] = useState('');
        const [rating, setRating] = useState(0);
        const [submitted, setSubmitted] = useState(false);
      
        const handleSubmit = (event) => {
          event.preventDefault();
          // Here you can send the feedback data to the server or perform any other action
          console.log('Feedback submitted:', { feedback, rating });
          // Clear the feedback field after submission
          setFeedback('');
          // Reset the rating
          setRating(0);
          // Set submitted state to true to display a success message
          setSubmitted(true);
          // Hide the success message after 3 seconds
          setTimeout(() => setSubmitted(false), 3000);
        };
      
        const handleRatingChange = (newRating) => {
          setRating(newRating);
        };
    return(
    <Layout>
       
    <div className="feedback-form">
      <h2>Give Us Feedback</h2>
      {submitted && <div className="success-message">Feedback submitted successfully!</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          placeholder="Enter your feedback here"
          required
        />
        <div className="rating">
          <p>Rate us:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              selected={star <= rating}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </Layout>
    )

    
}

const Star = ({ selected = false, onClick }) => (
  <span className={selected ? 'star selected' : 'star'} onClick={onClick}>
    ★
  </span>
);


export default Feedback;