import React from 'react';
import '../css/staffProfile.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const StaffProfile = ({ profile }) => {
  // Destructure profile data with default values
  const {
    profilePic = '',
    firstName = '',
    lastName = '',
    contactNumber = '',
    nic = '',
    email = '',
    designation = '',
    address = '',
    dateJoined = '',
  } = profile || {};

  return (
    <>
      <Header/>
      <div className='staffProfileContainer'>
      <div className="staff-profile">
        {/* Render profile picture */}
        <img src={profilePic} alt="Profile" />

        {/* Render profile details */}
        <div>
          <h2>{firstName} {lastName}</h2>
          <p>Contact Number: {contactNumber}</p>
          <p>NIC: {nic}</p>
          <p>Email: {email}</p>
          <p>Designation: {designation}</p>
          <p>Address: {address}</p>
          <p>Date Joined: {dateJoined}</p>
        </div>

        <div className="action-buttons">
            {/* Apply for Leave button with anchor tag */}
            <a href="/staffLeaveForm" className="apply-leave-button">Apply for Leave</a>
            <button className="edit-profile-button">Edit Profile</button>
            <button className="delete-profile-button">Delete Profile</button>
          </div>
      </div>

      </div>
      <Footer />
    </>
  );
};

export default StaffProfile;
