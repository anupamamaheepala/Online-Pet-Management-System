// LeaveDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/LeaveDetails.css';

const LeaveDetails = () => {
  const { leaveId } = useParams();
  const [leaveDetails, setLeaveDetails] = useState(null);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/staffLeave/details/${leaveId}`);
        setLeaveDetails(response.data);
      } catch (error) {
        console.error('Error fetching leave details:', error);
      }
    };
    fetchLeaveDetails();
  }, []); 

  
  if (!leaveDetails) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  
  const approveLeave = async () => {
    try {
      await axios.put(`http://localhost:9000/staffLeave/approve/${leaveId}`);
      window.location.href = '/StaffLeaveList';
      // Fetch updated leave details after approval
      const response = await axios.get(`http://localhost:9000/staffLeave/details/${leaveId}`);
      // Update the local state with the updated leave details
      setLeaveDetails(response.data);
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };
  
  const disapproveLeave = async () => {
    try {

  
      await axios.put(`http://localhost:9000/staffLeave/disapprove/${leaveId}`);
      window.location.href = '/StaffLeaveList';
      // Fetch updated leave details after disapproval
      const response = await axios.get(`http://localhost:9000/staffLeave/details/${leaveId}`);
      // Update the local state with the updated leave details
      setLeaveDetails(response.data);
    } catch (error) {
      console.error('Error disapproving leave:', error);
    }
  };
  
  
  

  return (
    <div className='leavedeatils'>
      <h2>Leave Details</h2>
      <p>Staff ID: {leaveDetails.staffId}</p>
      <p>Leave From: {formatDate(leaveDetails.StleaveFromDate)}</p>
      <p>Leave To: {formatDate(leaveDetails.StleaveToDate)}</p>
      <p>Leave Type: {leaveDetails.StleaveType}</p>
      <p>Reason For Leave: {leaveDetails.streason}</p>
      <p>Status: {leaveDetails.status}</p>
      <p>Applied Date: {formatDate(leaveDetails.createdAt)}</p>

     
        <div className='Staffbutton-container'>
        <button className='StaffLeave-Approve' onClick={approveLeave}>Approve</button>
        <button className='StaffLeave-Disapprove' onClick={disapproveLeave}>Disapprove</button>
        </div>

    </div>
  );
};

export default LeaveDetails;
