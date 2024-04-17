import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackinquiry.css';

export const FeedbackInquiry = () => {
  const form = useRef();

  const sendEmail = () => {
    emailjs.sendForm('service_hs3xk19', 'template_vzgks8e', form.current, {
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

  const submitForm = (e) => {
    e.preventDefault();
    console.log('Submitting form data...');
    const formData = new FormData(form.current);
    console.log('Form data:', formData);
    fetch('/feedback', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form data submitted successfully!', data);
      })
      .catch(error => {
        console.error('Failed to submit form data:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="custom-form-container">
        <form ref={form}>
          <label className="custom-form-label">Name</label>
          <input className="custom-form-input" type="text" name="name" />
          <label className="custom-form-label">Email</label>
          <input className="custom-form-input" type="email" name="email" />
          <label className="custom-form-label">Feedback</label>
          <textarea className="custom-form-textarea" name="feedback" />
          <button className="custom-form-submit" onClick={submitForm}>Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackInquiry;
