import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../css/StaffLeaveList.css';
import axios from 'axios';
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
      return 'Approved';
    } else if (leave.status === 'Disapproved') {
      return 'Disapproved';
    } else {
      return 'Pending';
    }
  };
  
  const approveLeave = async (leaveId, index) => {
    try {
      await axios.put(`http://localhost:9000/staffLeave/approve/${leaveId}`);
      // Update the approved status of the leave in the local state
      const updatedLeaves = [...leaves];
      updatedLeaves[index].approved = true; // Update the 'approved' field to true
      setLeaves(updatedLeaves);
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  // Frontend code in React component
const [disapprovalReason, setDisapprovalReason] = useState("");


const disapproveLeave = async (leaveId, index) => {
  try {
    // Prompt user for disapproval reason
    const reason = prompt("Enter reason for disapproval:");
    if (!reason) return; // If reason is not provided, do nothing

    // Send disapproval reason along with leave ID to the backend
    await axios.put(`http://localhost:9000/staffLeave/disapprove/${leaveId}`, { reason });

    // Update the local state to mark leave as disapproved and update the status
    const updatedLeaves = [...leaves];
    updatedLeaves[index].status = 'Disapproved'; // Update status to 'Disapproved'
    setLeaves(updatedLeaves);
  } catch (error) {
    console.error('Error disapproving leave:', error);
  }
};



return (
  <>
    <SystemAdminHeader />
    <h2>Staff Leave List</h2>
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
            
            <th>Action</th>
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
                {!leave.approved && (
                  <button className='StaffLeave-Approve' onClick={() => approveLeave(leave._id, index)}>Approve</button>
                )}
                <button className='StaffLeave-Disapprove' onClick={() => disapproveLeave(leave._id, index)}>Disapprove</button>
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

export default StaffLeaveList;
