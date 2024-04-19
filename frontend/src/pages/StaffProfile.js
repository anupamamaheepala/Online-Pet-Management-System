import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const { id } = useParams(); // Accessing id parameter from URL

  useEffect(() => {
    const fetchStaffProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/staff/profile/${id}`);
        setStaff(res.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchStaffProfile();
  }, [id]); // Make sure to include id in the dependency array

  return (
    <div>
      <h2>Staff Profile</h2>
      {staff && (
        <div>
          <p>Staff ID: {staff.staffId}</p>
          <p>First Name: {staff.sfirstname}</p>
          <p>Last Name: {staff.slastname}</p>
          <p>NIC: {staff.snic}</p>
          <p>Email: {staff.semail}</p>
          <p>Contact Number: {staff.scontactNumber}</p>
          <p>Address: {staff.saddress}</p>
          <p>Designation: {staff.designation}</p>
          {/* Add more details if needed */}
        </div>
      )}
    </div>
  );
};

export default StaffProfile;
