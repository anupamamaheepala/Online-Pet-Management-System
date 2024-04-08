// export default MyProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import '../css/myprofile.css'; // Import the CSS file

const MyProfile = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { customerId } = useParams(); // Extract customerId from URL parameters

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
        setCustomerData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleEditProfile = () => {
    // Implement edit profile logic here
    console.log('Editing profile...');
  };

  const handleDeleteProfile = () => {
    // Implement delete profile logic here
    console.log('Deleting profile...');
  };

  const handlePasswordReset = () => {
    // Implement password reset logic here
    console.log('Resetting password...');
  };

  const handleAddPet = () => {
    // Implement add pet logic here
    console.log('Adding pet...');
  };

  const handleProfilePhotoChange = (e) => {
    // Implement logic to handle profile photo upload
    const file = e.target.files[0];
    // Set profile photo to the uploaded file
    setCustomerData((prevData) => ({
      ...prevData,
      profilePhoto: URL.createObjectURL(file)
    }));
  };

  return (
    <>
      <Header />
      <div className="MyProfileContainer_custom">
        {loading ? (
          <p className="LoadingIndicator">Loading...</p>
        ) : (
          <div className="ProfileCard_custom">
            <div className="ProfileHeader_custom">
             <button onClick={handleAddPet} className="MyPetsButton_custom">My Pets</button>
             <br></br>
             </div>
             <div>
              <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
              <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="ProfilePhotoInput_custom" />
              
            </div>
            <div>
            <h2 className='MyProfileTitle'>My Profile</h2>
            <p>Username: {customerData.username}</p>
            <p>Email: {customerData.email}</p>
            <p>Contact Number: {customerData.contactNumber}</p>
            <p>Address: {customerData.address}</p>
            <div className='editreset_container'>
            <button onClick={handlePasswordReset} className="ResetPasswordButton_custom">Reset Password</button>
            <button onClick={handleEditProfile} className="EditButton_custom">Edit Profile</button>
            </div>
            </div>
            
            <div className='mypdel_container'>
            <button onClick={handleDeleteProfile} className="DeleteButton_custom">Delete Profile</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
