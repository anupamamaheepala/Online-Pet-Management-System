
import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackinquiry.css';

const FeedbackInquiry = () => {
  const formRef = useRef(); // Create a reference to the form element

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/feedbackinquiry/feedback", formData); // Send form data to backend endpoint
      console.log('Feedback submitted successfully');

      // Optionally, clear the form fields after successful submission
      setFormData({
        name: '',
        email: '',
        feedback: ''
      });
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Optionally, you can show an error message to the user
    }
  };

  const sendEmail = () => {
    emailjs.sendForm('service_hs3xk19', 'template_vzgks8e', formRef.current, {
      publicKey: 'J8nt0NYTxJsPNGwOp',
    })
      .then(
        () => {
          console.log('Email sent successfully!');
        },
        (error) => {
          console.error('Failed to send email:', error);
        },
      );
  };

  return (
    <>
      <Header />
      <div className="custom-form-container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <label className="custom-form-label">Name</label>
          <input className="custom-form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
          <label className="custom-form-label">Email</label>
          <input className="custom-form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
          <label className="custom-form-label">Feedback</label>
          <textarea className="custom-form-textarea" name="feedback" value={formData.feedback} onChange={handleChange} />
          <button className="custom-form-submit" type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackInquiry;
