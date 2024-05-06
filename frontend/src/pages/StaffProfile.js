import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/staffProfile.css';
import Footer from '../components/Footer';
import VetHeader from '../components/Vet components/VetHeader';
import GroomeHeader from '../components/Groome components/GroomerHeader';
import SystemAdminHeader from '../components/SystemAdminHeader';
import TrainingHeader from '../components/Training component/TrainingHeader';
import AdsHeader from '../components/ads components/AdsHeader';

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
      }
    };
  
    fetchStaffProfile();
  }, [id]);

  const handleDelete = () => {
    
  };

  const renderHeader = () => {
    if (staff) {
      switch (staff.designation) {
        case 'Veterinarian':
          return <VetHeader />;
        case 'System Manager':
          return <SystemAdminHeader />;
        case 'Pet Training Manager':
          return <TrainingHeader />;
        case 'Advertisement Coordinator':
          return <AdsHeader />;
        default:
          return <GroomeHeader />;
      }
    }
    return null;
  };

  return (
    <>
      {renderHeader()}

      <div className='StaffProfileContainer'>
        <div className='staffProfileWrapper'>
          <br /><br />
          <center><h2>Profile Information</h2></center>
          <br />
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

              <br />
              <div className="StaffProfilenavigation-row">
                <Link className="staffProfile-update-btn" to={`/update/${staff._id}`}>Update</Link>
                <button className="staffProfile-delete-btn" onClick={() => handleDelete(staff._id)}>Delete</button>
              </div>

              <div className="StaffProfilenavigation-row">
                <Link className="staffProfile-leave-btn" to={`/StaffLeaveForm/${staff.staffId}?staffId=${staff.staffId}&sfirstname=${staff.sfirstname}&slastname=${staff.slastname}`}>
                  Apply for Leave
                </Link>
                <Link to={`/applied-leaves/${id}`} className="staffProfile-view-salary-btn">Applied Leaves</Link>
                <Link to={`/SalaryView/${id}`} className="staffProfile-view-salary-btn">View Salary</Link>
              </div>

            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffProfile;
