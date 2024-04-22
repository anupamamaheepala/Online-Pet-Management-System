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
  const [errors, setErrors] = useState({}); // state to hold validation errors

  const { feedback, email, name, rating } = formData;

  const navigate = useNavigate(); 

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user types
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
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
    }
  };

  const handleRatingChange = newRating => {
    setFormData({ ...formData, rating: newRating });
  };

  const goToFeedbackDisplay = () => {
    navigate('/feedbackDisplay'); // move to feedbackDisplay one
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate name field
    if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = 'Name must contain only letters';
      valid = false;
    }

    // Validate email field
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    setErrors(errors);
    return valid;
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
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="name">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={onChange} required />
            {errors.name && <span className="error">{errors.name}</span>}
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
