// FeedbackInquiryAdmin.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../css/feedbackadmininquiry.css'; // Import your CSS file
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeedbackInquiryAdmin = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data when the component mounts
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
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback, index) => (
              <tr key={index} className="feedback-item">
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
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
