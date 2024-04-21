import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackreplyform.css';
import { useParams } from 'react-router-dom';

const FeedbackReplyForm = ({ onSubmit }) => {
  const { _id, feedback } = useParams(); // Use _id instead of id
  const [formData, setFormData] = useState({
    feedback: feedback,
    reply: ''
  });

  const { reply } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Make POST request 
      await axios.post(`http://localhost:9000/feedback/${_id}/reply`, { reply }); // Use backticks 
      // clear the form  submission
      setFormData({ ...formData, reply: '' });
      // callback function passed from parent component
      if (onSubmit) onSubmit();
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
            value={feedback}
            onChange={onChange}
            placeholder="Write your reply here"
            name="feedback"
            readOnly // Make field read-only
            required
          />
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
