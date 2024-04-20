import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackreplyform.css';

const FeedbackReplyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    reply: ''
  });

  const { reply } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await onSubmit(formData.reply);
      // Optionally, you can clear the form field after successful submission
      setFormData({ reply: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-reply-form-container">
        <form className="feedback-reply-form" onSubmit={handleSubmit}>
          <textarea
            className='feedback-reply-textarea'
            value={reply}
            onChange={onChange}
            placeholder="Write your reply here"
            name="reply"
            required
          />
          <button type="submit" className="ssubmit-button">Submit Reply</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackReplyForm;
