import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch application data from the backend when the component mounts
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:9000/training/applications/${id}');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h2>View Applications</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Owner's Name</th>
              <th>Dog's Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application.id}>
                <td>{application.ownerName}</td>
                <td>{application.dogName}</td>
                <td>{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ViewApplication;
