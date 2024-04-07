// // // // // UserProfile.js

// // // // import React, { useState } from 'react';
// // // // import '../css/userprofile.css';

// // // // function UserProfile() {
// // // //   const [profileData, setProfileData] = useState({
// // // //     userName: 'subodhi',
// // // //     email: 'subodhi@gmail.com',
// // // //     contactNumber: '123-456-7890',
// // // //     address: '123 Main St,galle',
// // // //     profilePhoto: 'default-profile-photo.jpg'
// // // //   });

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setProfileData(prevState => ({
// // // //       ...prevState,
// // // //       [name]: value
// // // //     }));
// // // //   };

// // // //   const handleProfilePhotoChange = (e) => {
// // // //     // Implement logic to handle profile photo upload
// // // //     const file = e.target.files[0];
// // // //     // Set profile photo to the uploaded file
// // // //     setProfileData(prevState => ({
// // // //       ...prevState,
// // // //       profilePhoto: URL.createObjectURL(file)
// // // //     }));
// // // //   };

// // // //   const handleUpdateProfile = () => {
// // // //     // Implement logic to update user profile
// // // //     console.log('Updating user profile:', profileData);
// // // //   };

// // // //   const handleDeleteProfile = () => {
// // // //     // Implement logic to delete user profile
// // // //     console.log('Deleting user profile:', profileData);
// // // //   };

// // // //   return (
// // // //     <div className="UserProfile">
// // // //       <div className="profilePhotoContainer">
// // // //         <img src={profileData.profilePhoto} alt="Profile" />
// // // //         <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
// // // //         <button>Edit Profile Photo</button>
// // // //       </div>
// // // //       <div className="profileInfo">
// // // //         <label htmlFor="userName">User Name:</label>
// // // //         <input type="text" id="userName" name="userName" value={profileData.userName} onChange={handleChange} />

// // // //         <label htmlFor="email">Email:</label>
// // // //         <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange} />

// // // //         <label htmlFor="contactNumber">Contact Number:</label>
// // // //         <input type="text" id="contactNumber" name="contactNumber" value={profileData.contactNumber} onChange={handleChange} />

// // // //         <label htmlFor="address">Address:</label>
// // // //         <textarea id="address" name="address" value={profileData.address} onChange={handleChange} />

// // // //         <button onClick={handleUpdateProfile}>Update Profile</button>
// // // //         <button onClick={handleDeleteProfile}>Delete Profile</button>
// // // //         <button>Create Pet Profile</button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default UserProfile;

// // // // MyProfile.js

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';

// // // const MyProfile = () => {
// // //   const [customerData, setCustomerData] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchCustomerData = async () => {
// // //       try {
// // //         // Make a request to fetch customer data
// // //         const res = await axios.get('http://localhost:9000/customer/yourCustomerIdHere');
// // //         setCustomerData(res.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error(error);
// // //         // Handle error
// // //       }
// // //     };

// // //     fetchCustomerData();
// // //   }, []);

// // //   return (
// // //     <>
// // //       <Header />
// // //       <div>
// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : (
// // //           <div>
// // //             <h2>My Profile</h2>
// // //             <p>Username: {customerData.username}</p>
// // //             <p>Email: {customerData.email}</p>
// // //             <p>Contact Number: {customerData.contactNumber}</p>
// // //             <p>Address: {customerData.address}</p>
// // //             {/* Add more fields as needed */}
// // //           </div>
// // //         )}
// // //       </div>
// // //       <Footer />
// // //     </>
// // //   );
// // // };

// // // export default MyProfile;
// // // MyProfile.js

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';

// // const MyProfile = () => {
// //   const [customerData, setCustomerData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchCustomerData = async () => {
// //       try {
// //         // Make a request to fetch customer data
// //         const res = await axios.get('http://localhost:9000/customer/yourCustomerIdHere');
// //         setCustomerData(res.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error(error);
// //         // Handle error
// //       }
// //     };

// //     fetchCustomerData();
// //   }, []);

// //   return (
// //     <>
// //       <Header />
// //       <div>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <div>
// //             <h2>My Profile</h2>
// //             <p>Username: {customerData.username}</p>
// //             <p>Email: {customerData.email}</p>
// //             <p>Contact Number: {customerData.contactNumber}</p>
// //             <p>Address: {customerData.address}</p>
// //             {/* Add more fields as needed */}
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
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

// const MyProfile = () => {
//   const [customerData, setCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { customerId } = useParams(); // Extract customerId from URL parameters

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Make a request to fetch customer data using the customerId
//         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
//         setCustomerData(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchCustomerData();
//   }, [customerId]); // Add customerId to dependency array

//   return (
//     <>
//       <Header />
//       <div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             <h2>My Profile</h2>
//             <p>Username: {customerData.username}</p>
//             <p>Email: {customerData.email}</p>
//             <p>Contact Number: {customerData.contactNumber}</p>
//             <p>Address: {customerData.address}</p>
//             {/* Add more fields as needed */}
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
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const MyProfile = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { customerId } = useParams();

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

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>My Profile</h2>
            <p>Username: {customerData.username}</p>
            <p>Email: {customerData.email}</p>
            <p>Contact Number: {customerData.contactNumber}</p>
            <p>Address: {customerData.address}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
