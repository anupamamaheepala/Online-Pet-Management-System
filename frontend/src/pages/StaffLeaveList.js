import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../css/StaffLeaveList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SystemAdminHeader from '../components/SystemAdminHeader';

const StaffLeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/staffLeave/getallleaves');
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };
    fetchData();
  }, []);


  const getStatusText = (leave) => {
    if (leave.approved) {
      return <span style={{ color: 'green' }}>Approved</span>;
    } else if (leave.status === 'Disapproved') {
      return <span style={{ color: 'red' }}>Rejected</span>;
    } else {
      return <span style={{ color: 'black' }}>Pending</span>;
    }
  };
  


const handleViewDetails = (leaveId) => {
  // Logic to handle viewing details
};

const handleDeleteLeave = async (leaveId, index) => {
  try {
    // Send request to delete the leave record
    await axios.delete(`http://localhost:9000/staffLeave/delete/${leaveId}`);
    
    // Update the local state to remove the deleted leave
    const updatedLeaves = [...leaves];
    updatedLeaves.splice(index, 1); // Remove the leave at the specified index
    setLeaves(updatedLeaves);
  } catch (error) {
    console.error('Error deleting leave:', error);
  }
};


return (
  <>
    <SystemAdminHeader />
    <br></br>
    <center><h2>Staff Leave List</h2></center>
    <div className='staffLeaveListcontainer1'>
    
      <table className='staffLeaveList-table'>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Leave From Date</th>
            <th>Leave To Date</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th> 
            
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={leave._id}>
              <td>{leave.staffId}</td>
              <td>{new Date(leave.StleaveFromDate).toLocaleDateString()}</td>
              <td>{new Date(leave.StleaveToDate).toLocaleDateString()}</td>
              <td>{leave.StleaveType}</td>
              <td>{leave.streason}</td>
              <td>{getStatusText(leave)}</td>
              <td>
               <Link to={`/leave-details/${leave._id}`} className='View-Details'>View Details</Link>

                <button className='Delete-Leave' onClick={() => handleDeleteLeave(leave._id, index)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <br></br>
    <Footer />
  </>
);


};

export default StaffLeaveList;
