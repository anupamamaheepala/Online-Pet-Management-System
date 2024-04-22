import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import '../css/myprofile.css'; 

const MyProfile = () => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
        setCustomerData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleDeleteProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this profile?');

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:9000/customer/${customerId}`);
        alert('Profile deleted successfully');
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        alert('Failed to delete profile');
        window.location.href = '/Register';
      }
    } else {
      alert('Deletion cancelled.');
    }
  };


const onFileChange = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('profilePhoto', file);

  try {
      const res = await axios.put(`http://localhost:9000/customer/profile-photo/${customerId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      // Update the profile photo URL in the state with the URL returned by the server
      setCustomerData({ ...customerData, profilePhoto: res.data.profilePhoto });

      // Show a success message
      alert('Profile photo uploaded successfully');
  } catch (error) {
      console.error(error);
      alert('Failed to upload profile photo');
  }
};

const handleDeleteProfilePhoto = async () => {
  const confirmed = window.confirm('Are you sure you want to delete the profile photo?');

  if (confirmed) {
    try {
      await axios.delete(`http://localhost:9000/customer/profile-photo/${customerId}`);
      // After successful deletion, update the customer data state
      setCustomerData({ ...customerData, profilePhoto: '' });
      alert('Profile photo deleted successfully');

      setTimeout(() => {
        window.location.href = '/Register';
      }, 3000); 

    } catch (error) {
      console.error(error);
      alert('Failed to delete profile photo');
    }
  } else {
    alert('Deletion cancelled.');
  }
};




  return (
    <>
      <Header profilePhoto={customerData && customerData.profilePhoto}/>

      <div className="MyProfileContainer_custom">
        {loading ? (
          <p className="LoadingIndicator">Loading...</p>
        ) : (
          <div className="ProfileCard_custom">
            <h2 className="MyProfileTitle">My Profile</h2>
            <div className="ProfileHeader_custom">
              <Link className="mypetbutton" to={`/addpet/${customerId}`}>Add Pet</Link>
              <Link className="mypetbutton" to={`/my-pets/${customerId}`}>My Pets</Link>
            </div>
            <div className="mypmaindiv">
              <div className="mypdivleft">
                <div className="smypinfoimg">
                  <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
                </div>
                <div className="mypinfoimg">
                  <input type="file" name="image" onChange={onFileChange} className="ProfilePhotoInput_custom" />
                  <button onClick={handleDeleteProfilePhoto} className="ProfilePhotoDeleteButton_custom">Delete Photo</button>
                </div>
                <div className="editreset_container">
                <Link to={`/reset-password/${customerId}`} className="ResetPasswordButton_custom">Reset Password</Link>
                  &nbsp;
                  &nbsp;
                  <Link to={`/edit-profile/${customerId}`} class="btn btn-warning">Edit Profile</Link>
                </div>
              </div>

              <div className="mypdivright">
                <br />
                <br />
                <div className="mypinfo">
                  <p><strong>Username:</strong> {customerData.username}</p>
                  <p><strong>Email:</strong> {customerData.email}</p>                  
                  <p><strong>Address:</strong> {customerData.address}</p>
                  <p><strong>Contact Numbers:</strong></p>
                  {customerData.contactNumbers.map((contactNumber, index) => (
                    <p key={index} className="contact-number">
                      {contactNumber}
                    </p>
                  ))}
                  
                </div>
                <br />
              </div>
            </div>

            <div className="mypdel_container">
              <button onClick={handleDeleteProfile} className="btn btn-danger">Delete Profile</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
