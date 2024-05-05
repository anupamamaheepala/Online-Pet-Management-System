import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../css/StaffLeaveList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SystemAdminHeader from '../components/SystemAdminHeader';

const StaffLeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

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

  useEffect(() => {
    // Counting leave status
    const countStatus = () => {
      let pending = 0;
      let approved = 0;
      let rejected = 0;

      leaves.forEach(leave => {
        if (leave.approved) {
          approved++;
        } else if (leave.status === 'Disapproved') {
          rejected++;
        } else {
          pending++;
        }
      });

      setPendingCount(pending);
      setApprovedCount(approved);
      setRejectedCount(rejected);
    };

    countStatus();
  }, [leaves]);

  const getStatusText = (leave) => {
    if (leave.approved) {
      return <span style={{ color: 'green' }}>Approved</span>;
    } else if (leave.status === 'Disapproved') {
      return <span style={{ color: 'red' }}>Rejected</span>;
    } else {
      return <span style={{ color: 'black' }}>Pending</span>;
    }
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

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredLeaves = leaves.filter((leave) => {
    if (!searchValue) return true;
    const normalizedSearchValue = searchValue.toLowerCase().trim();
    const renderedStatusText = getStatusText(leave).props.children.toLowerCase().trim();
    
    if (searchField === 'staffId') {
      return leave.staffId.toLowerCase().includes(normalizedSearchValue);
    } else if (searchField === 'leaveType') {
      return leave.StleaveType.toLowerCase().includes(normalizedSearchValue);
    } else if (searchField === 'status') {
      return renderedStatusText.includes(normalizedSearchValue);
    }
    
    return false;
  });
  
  
  

  return (
    <>
      <SystemAdminHeader />
      <br />
      <center><h2>Staff Leave List</h2></center>
      <div className='staffLeaveListcontainer1'>
        <div className="leave-status">
          <p>Pending Requests: {pendingCount}</p>
          <p>Approved Requests: {approvedCount}</p>
          <p>Rejected Requests: {rejectedCount}</p>
        </div>
        <div className="leaveListsearch-bar">
          <select value={searchField} onChange={handleSearchFieldChange}>
            <option value="staffId">Staff ID</option>
            <option value="leaveType">Leave Type</option>
            <option value="status">Status</option>
          </select>
          <input type="text" placeholder="Search..." value={searchValue} onChange={handleSearchValueChange} />
        </div>
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
            {filteredLeaves.map((leave, index) => (
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
      <br />
      <Footer />
    </>
  );
};

export default StaffLeaveList;
