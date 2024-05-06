import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AppliedLeves.css';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const AppliedLeaves = () => {
  const { id } = useParams(); // Accessing staffId parameter from URL
  const [appliedLeaves, setAppliedLeaves] = useState([]);

  useEffect(() => {
    const fetchAppliedLeaves = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/staffLeave/applied-leaves/${id}`);
        setAppliedLeaves(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAppliedLeaves();
  }, [id]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };
  
  return (

    <>
    <div className='AppliedLeavesCon'>
      <h2 className='AppliedLeavesHead'>Applied Leaves</h2>
      <ul className='AppliedLeavescard'>
          {appliedLeaves.map((leave) => (
            <li key={leave._id}>
              <p>Staff ID: {leave.staffId}</p>
              <p>Staff ID: {leave.staffId}</p>
              <p>From: {formatDate(leave.StleaveFromDate)}</p>
              <p>To: {formatDate(leave.StleaveToDate)}</p>
              <p>Type: {leave.StleaveType}</p>
              <p>Reason: {leave.streason}</p>
              <p>Requested Date: {formatDate(leave.createdAt)}</p>
              
              <p style={{ color: leave.status === 'Approved' ? 'green' : leave.status === 'Disapproved' ? 'red' : 'black' }}>
              Status: {leave.status}
            </p>
             </li>
          ))}
      </ul>
    </div>

    <Footer />
    </>
  );
};

export default AppliedLeaves;
