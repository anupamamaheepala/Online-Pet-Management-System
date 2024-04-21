import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    feedback: '',
    email: '',
    name: '',
    rating: 0
  });

  const [submitted, setSubmitted] = useState(false); // check successful submission one 

  const { feedback, email, name, rating } = formData;

  const navigate = useNavigate(); 

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/feedback/feed", formData);
      console.log(res.data);
      // clear form after submission
      setFormData({
        feedback: '',
        email: '',
        name: '',
        rating: 0 // Reset rating after 
      });
      setSubmitted(true); 
      // Hide the  message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingChange = newRating => {
    setFormData({ ...formData, rating: newRating });
  };

  const goToFeedbackDisplay = () => {
    navigate('/feedbackDisplay'); // move to feedbackDisplay one
  };

  return (
    <>
      <Header />
      <div className="feedback-form">
        <h2>Give Us Feedback</h2>
        {submitted && <div className="success-message">Feedback submitted successfully!</div>}
        <form onSubmit={onSubmit}>
          
          <div className="email">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="name">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={onChange} required />
          </div>
          <textarea
            value={feedback}
            onChange={onChange}
            placeholder="Enter your feedback here"
            name="feedback"
            required
          />
          {/* Rating Section */}
          <div className="rating">
            <p>Rate us:</p>
            {[1, 2, 3, 4, 5].map(star => (
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
      <div className="view-feedback">
        <button onClick={goToFeedbackDisplay}>View Feedback</button>
      </div>
      <Footer />
    </>
  );
};

const Star = ({ selected = false, onClick }) => (
  <span className={selected ? 'star selected' : 'star'} onClick={onClick}>
    ★
  </span>
);

export default Feedback;
