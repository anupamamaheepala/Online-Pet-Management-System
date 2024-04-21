import React, { useState, useRef } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackinquiry.css';


const FeedbackInquiry = () => {
  const formRef = useRef();

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
      // Send data to backend 
      await axios.post("http://localhost:9000/feedbackinquiry/feedback", formData);

      // Send email with customer's name
      await sendEmail(formData.name);

      console.log('Feedback submitted successfully');
      // clear the form fields after successful submission
      setFormData({
        name: '',
        email: '',
        feedback: '' 
      });
      // show a success message to the user
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // show an error message to the user
    }
  };

  const sendEmail = (customerName) => {
    // Pass  name as parameter to the email template
    return emailjs.sendForm('service_hs3xk19', 'template_vzgks8e', formRef.current, {
      publicKey: 'J8nt0NYTxJsPNGwOp',
      name: formData.name,
      email: formData.email,
      feedback: formData.feedback
    });
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