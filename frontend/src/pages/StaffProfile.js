// /// UserProfile.js

// import React, { useState } from 'react';
// import './userprofile.css';

// function UserProfile() {
//   const [profileData, setProfileData] = useState({
//     userName: 'John Doe',
//     email: 'johndoe@example.com',
//     contactNumber: '123-456-7890',
//     address: '123 Main St, City, Country',
//     profilePhoto: 'default-profile-photo.jpg'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleProfilePhotoChange = (e) => {
//     // Implement logic to handle profile photo upload
//     const file = e.target.files[0];
//     // Set profile photo to the uploaded file
//     setProfileData(prevState => ({
//       ...prevState,
//       profilePhoto: URL.createObjectURL(file)
//     }));
//   };

//   const handleUpdateProfile = () => {
//     // Implement logic to update user profile
//     console.log('Updating user profile:', profileData);
//   };

//   const handleDeleteProfile = () => {
//     // Implement logic to delete user profile
//     console.log('Deleting user profile:', profileData);
//   };

//   const handleLeave = () => {
//     // Implement logic to navigate to pet profile creation page
//     console.log('Request Leave');
//   };

//   return (
//     <div className="StaffProfile">
//       <div className="profilePhotoContainer">
//         <img src={profileData.profilePhoto} alt="Profile" />
//         <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
//       </div>
//       <div className="profileInfo">
//         <label htmlFor="Name">Name:</label>
//         <input type="text" id="Name" name="Name" value={profileData.Name} onChange={handleChange} />

//         <label htmlFor="designation">Designation:</label>
//         <input type="text" id="designation" name="designation" value={profileData.designation} onChange={handleChange} />

//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange} />

//         <label htmlFor="contactNumber">Contact Number:</label>
//         <input type="text" id="contactNumber" name="contactNumber" value={profileData.contactNumber} onChange={handleChange} />

//         <label htmlFor="address">Address:</label>
//         <textarea id="address" name="address" value={profileData.address} onChange={handleChange} />

//         <label htmlFor="qualifications">Educational Qualifications:</label>
//         <textarea id="qualifications" name="qualifications" value={profileData.qualifications} onChange={handleChange} />


//         <button onClick={handleUpdateProfile}>Update Profile</button>
//         <button onClick={handleDeleteProfile}>Delete Profile</button>
//         <button onClick={handleLeave}>Request Leave </button>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;