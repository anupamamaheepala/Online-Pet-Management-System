import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/faqselect.css';

const FAQselect = () => {
  return (
    <>
      <Header />
      <div className="faq-container">
        <h1>Welcome to Feedback Page</h1>
        <Link to="/feedback" className="faq-button faq-button-feedback">Give Feedback</Link>
        <Link to="/feedbackinquiry" className="faq-button faq-button-inquiry">Make an Inquiry</Link>
        <Link to="/feedbackdisplay" className="faq-button faq-button-display">View Feedbacks</Link>
      </div>
      <Footer />
    </>
  );
};

export default FAQselect;
