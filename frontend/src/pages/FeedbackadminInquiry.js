import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/feedbackadmininquiry.css';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';
import jsPDF from 'jspdf';
import { Link } from "react-router-dom";

const FeedbackInquiryAdmin = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredData = feedbackData.filter(feedback => {
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      feedback.name.toLowerCase().includes(searchQueryLower) ||
      feedback.email.toLowerCase().includes(searchQueryLower) 
      // feedback.feedback.toLowerCase().includes(searchQueryLower)
    );
  });

  const GenReport = () => {
    const doc = new jsPDF('');
    const title = "Feedback Report";
    const titleMargin = 20;
    const tableMargin = 20;
    const titleWidth = doc.getTextWidth(title);
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);

    doc.text(title, center, titleMargin);

    // Create logo 
    const logo = new Image();
    logo.src = '/images/logo.png';

    
    logo.onload = function() {
      const logoWidth = 20; // Adjust the width 
      const xPosition = 10; //  left margin
      const yPosition = 10; //  top margin

      doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);

      doc.autoTable({
        head: [['Name', 'Email', 'Feedback']],
        body: filteredData.map((val, i) => [val.name, val.email, val.feedback]),
        startY: titleMargin + tableMargin
      });

      doc.save('Inquiry Report.pdf');
    };
  };

  return (
    <>
      <SystemAdminHeader />
      <div className="feedback-inquiry-admin-container">
        <h1>Feedback Inquiry Admin Page</h1>
        <div className="search">
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
        </div>
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
            {filteredData.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-danger" onClick={() => handleDelete(feedback._id)}>Delete</button>
                    &nbsp;
                    <Link to={`/FeedbackReply/${feedback._id}/${feedback.name}/${feedback.email}/${feedback.feedback}`}>
                      <button className='btn btn-warning'>Reply</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='genButton'>
          <button onClick={GenReport}>Generate Report</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackInquiryAdmin;
