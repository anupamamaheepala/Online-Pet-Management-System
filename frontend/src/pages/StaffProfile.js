import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/staffProfile.css';
import Footer from '../components/Footer';
import VetHeader from '../components/Vet components/VetHeader';
import GroomeHeader from '../components/Groome components/GroomerHeader';


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

  
  const handleDelete = () => {

  };

  const handleApplyForLeave = () => {
  };

  return (
    <>
      {/* Conditionally render header based on staff's designation */}
      {staff && staff.designation === 'veterinarian' ? (
        
        <VetHeader />
      ) : (
        <GroomeHeader />
      )}
      
    <div className='StaffProfileContainer'>


       <div className='staffProfileWrapper'>
      <br></br><br></br>
      <center><h2>Profile Information</h2></center>
      <br></br>
      {staff && (
        <div className='staffProfile'>
          <p>Staff ID: {staff.staffId}</p>
          <p>First Name: {staff.sfirstname}</p>
          <p>Last Name: {staff.slastname}</p>
          <p>NIC: {staff.snic}</p>
          <p>Email: {staff.semail}</p>
          <p>Contact Number: {staff.scontactNumber}</p>
          <p>Address: {staff.saddress}</p>
          <p>Designation: {staff.designation}</p>
          <p>Qualifications: {staff.qualifications}</p>

          <br></br>
          <Link className="staffProfile-update-btn" to={`/update/${staff._id}`}>Update</Link>
          <button className="staffProfile-delete-btn" onClick={() => handleDelete(staff._id)}>Delete</button>
          <Link className="staffProfile-leave-btn" to={`/StaffLeaveForm/${staff.staffId}?staffId=${staff.staffId}&sfirstname=${staff.sfirstname}&slastname=${staff.slastname}`}>
            Apply for Leave </Link>
          <Link to={`/SalaryView/${id}`} className="staffProfile-view-salary-btn">View Salary</Link>
        </div>
      )}

      </div>
    </div>
    <Footer />
    </>

  );
};

export default StaffProfile;
