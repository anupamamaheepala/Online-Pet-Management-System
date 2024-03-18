// AdminTrainingApplications.js

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const AdminTrainingApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications from the server
    fetch('/api/training')
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/training/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Approved' })
      });
      if (response.ok) {
        // Update application status locally
        setApplications(applications.map(app => app._id === id ? { ...app, status: 'Approved' } : app));
      } else {
        console.error('Failed to approve application');
      }
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`/api/training/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Rejected' })
      });
      if (response.ok) {
        // Update application status locally
        setApplications(applications.map(app => app._id === id ? { ...app, status: 'Rejected' } : app));
      } else {
        console.error('Failed to reject application');
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  return (
    <Layout>
    <div>
      <h2>Training Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Report Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application._id}>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.date}</td>
              <td>{application.status}</td>
              <td>
                <Link to={`/application/${application._id}`}>View Details</Link>
                {application.status === 'Pending' && (
                  <div>
                    <Button variant="success" onClick={() => handleApprove(application._id)}>Approve</Button>
                    <Button variant="danger" onClick={() => handleReject(application._id)}>Reject</Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Layout>
  );
};

export default AdminTrainingApplications;
