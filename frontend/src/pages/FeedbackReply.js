import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackinquiry.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

const FeedbackReply = () => {
  const formRef = useRef();
  const { _id, name, email, feedback } = useParams();

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    feedback: feedback,
    reply: ''
  });

  const [emailSent, setEmailSent] = useState(false); // State to manage email sent success message

  useEffect(() => {
    // Fetch feedback details from the backend based on the _id parameter
    const fetchFeedbackDetails = async () => {
      try {
        const response = await axios.put(`http://localhost:9000/feedbackinquiry/${_id}`);
        const { name, email, feedback, reply } = response.data;
        setFormData({
          ...formData,
          name: name,
          email: email,
          feedback: feedback,
          reply: reply,
        });
      } catch (error) {
        console.error('Error fetching feedback details:', error);
      }
    };
    fetchFeedbackDetails();
  }, [_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email with customer's name
      await sendEmail(formData.name);

      console.log('Feedback submitted successfully');
      // Optionally, clear the form fields after successful submission
      setFormData({
        name: '',
        email: '',
        feedback: '',
        reply: ''
      });
      // Show success message
      setEmailSent(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Optionally, you can show an error message to the user
    }
  };

  const sendEmail = (customerName) => {
    // Pass customer's name as a parameter to the email template
    return emailjs.sendForm('service_87y425g', 'template_tftifef', formRef.current, {
      publicKey: 'J8nt0NYTxJsPNGwOp',
      name: formData.name,
      email: formData.email,
      feedback: formData.feedback,
      reply: formData.reply
    });
  };

  return (
    <>
      <Header />
      <div className="custom-form-container">
        {emailSent && <div className="success-message">Email sent successfully...!</div>}
        <form ref={formRef} onSubmit={handleSubmit}>
          <label className="custom-form-label">Name</label>
          <input className="custom-form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
          <label className="custom-form-label">Email</label>
          <input className="custom-form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
          <label className="custom-form-label">Feedback</label>
          <textarea className="custom-form-textarea" name="feedback" value={formData.feedback} onChange={handleChange} />
          <label className="custom-form-label">Reply</label>
          <textarea className="custom-form-textarea" name="reply" value={formData.reply} onChange={handleChange} />
          <button className="custom-form-submit" type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackReply;
