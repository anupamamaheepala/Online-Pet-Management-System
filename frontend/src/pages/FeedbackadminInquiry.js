// FeedbackInquiryAdmin.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/feedbackadmininquiry.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeedbackInquiryAdmin = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/feedbackinquiry/all");
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Failed to fetch feedback data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/feedbackinquiry/${id}`);
      const response = await axios.get("http://localhost:9000/feedbackinquiry/all");
      setFeedbackData(response.data);
      console.log('Feedback deleted successfully');
    } catch (error) {
      console.error('Failed to delete feedback:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-inquiry-admin-container">
        <h1>Feedback Inquiry Admin Page</h1>
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback, index) => (
              <tr key={index} className="feedback-item">
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>
                  <button onClick={() => handleDelete(feedback._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackInquiryAdmin;
