import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Trainingdashboard.css'; // Ensure correct path to your CSS file

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:9000/training/all');
        setTrainings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrainings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:9000/training/updateStatus/${id}`, { status });
      // Optionally, update the local state to reflect the change
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table className="alo1-table"> {/* Add unique class name */}
        <thead>
          <tr>
            <th>Owner's Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Dog's Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(training => (
            <tr key={training._id}>
              <td>{training.ownerName}</td>
              <td>{training.address}</td>
              <td>{training.contact}</td>
              <td>{training.dogName}</td>
              <td>{training.breed}</td>
              <td>{training.age}</td>
           
              <td>
                <select onChange={(e) => handleStatusChange(training._id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingDashboard;
