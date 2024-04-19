// // // export default MyProfile;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import { useParams } from 'react-router-dom';
// // import '../css/myprofile.css'; // Import the CSS file

// // const MyProfile = () => {
// //   const [customerData, setCustomerData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const { customerId } = useParams(); // Extract customerId from URL parameters

// //   useEffect(() => {
// //     const fetchCustomerData = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// //         setCustomerData(res.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error(error);
// //         // Handle error
// //       }
// //     };

// //     fetchCustomerData();
// //   }, [customerId]);

// //   const handleEditProfile = () => {
// //     // Implement edit profile logic here
// //     console.log('Editing profile...');
// //   };

// //   const handleDeleteProfile = () => {
// //     // Implement delete profile logic here
// //     console.log('Deleting profile...');
// //   };

// //   const handlePasswordReset = () => {
// //     // Implement password reset logic here
// //     console.log('Resetting password...');
// //   };

// //   const handleAddPet = () => {
// //     // Implement add pet logic here
// //     console.log('Adding pet...');
// //   };

// //   const handleProfilePhotoChange = (e) => {
// //     // Implement logic to handle profile photo upload
// //     const file = e.target.files[0];
// //     // Set profile photo to the uploaded file
// //     setCustomerData((prevData) => ({
// //       ...prevData,
// //       profilePhoto: URL.createObjectURL(file)
// //     }));
// //   };

// //   return (
// //     <>
// //       <Header />
// //       <div className="MyProfileContainer_custom">
// //         {loading ? (
// //           <p className="LoadingIndicator">Loading...</p>
// //         ) : (
          
// //           <div className="ProfileCard_custom">
// //             <h2 className='MyProfileTitle'>My Profile</h2>
            
// //             <div className="ProfileHeader_custom">
// //              <button onClick={handleAddPet} className="MyPetsButton_custom">My Pets</button>
// //              <br></br>
// //              </div>
// //             <center>
// //              <div>
// //               <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" /></div>
// //               <div>
// //               <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="ProfilePhotoInput_custom" />
              
// //             </div></center>
// //             <div>
            
// //             <div className='mypinfo'><p>Username: {customerData.username}</p>
// //             <p>Email: {customerData.email}</p>
// //             <p>Contact Number: {customerData.contactNumber}</p>
// //             <p>Address: {customerData.address}</p></div>
            
// //             <div className='editreset_container'>
// //             <button onClick={handlePasswordReset} className="ResetPasswordButton_custom">Reset Password</button>
// //             <button onClick={handleEditProfile} className="EditButton_custom">Edit Profile</button>
            
// //             </div>
// //             </div>
            
            
// //             <div className='mypdel_container'>
// //             <button onClick={handleDeleteProfile} className="DeleteButton_custom">Delete Profile</button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default MyProfile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams } from 'react-router-dom';
// import '../css/myprofile.css'; // Import the CSS file

// const MyProfile = () => {
//   const { customerId } = useParams();
//   const [customerData, setCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
//         setCustomerData(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchCustomerData();
//   }, [customerId]);

//   const handleEditProfile = () => {
//     // Implement edit profile logic here
//     console.log('Editing profile...');
//   };

//   const handleDeleteProfile = async () => {
//     // Prompt the user for confirmation
//     const confirmed = window.confirm('Are you sure you want to delete this profile?');
  
//     if (confirmed) {
//       try {
//         await axios.delete(`http://localhost:9000/customer/${customerId}`);
//         // Show alert message indicating successful deletion
//         alert('Profile deleted successfully');
//         // Redirect to the signup page
//         window.location.href = '/Register';
//       } catch (error) {
//         alert('Failed to delete customer');;
//         // Handle error
//       }
//     } else {
//       alert('Deletion cancelled.');
//     }
//   };
//   // const handleImageClick = (imageURL) => {
//   //       setSelectedImage(imageURL);
//   //   };

//   const handlePasswordReset = () => {
//     // Navigate to reset password page
//     window.location.href = '/reset-password';
//   };

//   const handleAddPet = () => {
//     // Implement add pet logic here
//     console.log('Adding pet...');
//   };

// // Inside the handleProfilePhotoChange function
// const onFileChange = async (e) => {
//   const file = e.target.files[0];
//   const formData = new FormData();
//   formData.append('profilePhoto', file);

//   try {
//     const res = await axios.put(`http://localhost:9000/customer/${customerId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     // Update the profile photo URL in the state after successful upload
//     setCustomerData({ ...customerData, profilePhoto: res.data.profilePhoto });
//   } catch (error) {
//     console.error(error);
//     // Handle error
//   }
// };



//   return (
//     <>
//       <Header />
//       <div className="MyProfileContainer_custom">
//         {loading ? (
//           <p className="LoadingIndicator">Loading...</p>
//         ) : (
          
//           <div className="ProfileCard_custom">
//             <div><h2 className='MyProfileTitle'>My Profile</h2></div>
            
//             <div className="ProfileHeader_custom">
//             <Link className="mypetbutton" to={`/addpet/${customerId}`}>Add Pet</Link>
//             <Link className="mypetbutton"to={`/my-pets/${customerId}`}>My Pets</Link>
//              <br></br>
//              </div>
//              <div class="mypmaindiv">
//   <div class="mypdivleft">
//     <div className='smypinfoimg'>
//       <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
//     </div>
//     <div className='mypinfoimg'>
//       <input type="file" name="image" onChange={onFileChange} className="ProfilePhotoInput_custom" />
  
      
//     </div>
//     <div class='editreset_container'>
//       <Link to="/reset-password" class="ResetPasswordButton_custom">Reset Password</Link>
//       &nbsp;
//       &nbsp;
//       &nbsp;
//       <Link to={`/edit-profile/${customerId}`} class="btn btn-warning">Edit Profile</Link> 
//     </div>
//   </div> 

//   <div class="mypdivright">
//     <br/>
//     <br/>
//     <div class='mypinfo'>
//       <p>Username: {customerData.username}</p>
//       <p>Email: {customerData.email}</p>
//       <p>Contact Number: {customerData.contactNumbers}</p>
//       <p>Address: {customerData.address}</p>
//     </div>
//     <br/>
//   </div>
// </div> 
 
            
            
//             <div className='mypdel_container'>
//             <button onClick={handleDeleteProfile} className="btn btn-danger">Delete Profile</button>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import '../css/myprofile.css'; // Import the CSS file

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
        // Handle error
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
        window.location.href = '/Register';
      } catch (error) {
        console.error(error);
        alert('Failed to delete profile');
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
      <Header />
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
