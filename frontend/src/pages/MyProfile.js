// // // // // // // // // // // // // UserProfile.js

// // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // import '../css/userprofile.css';

// // // // // // // // // // // // function UserProfile() {
// // // // // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // // // // //     userName: 'subodhi',
// // // // // // // // // // // //     email: 'subodhi@gmail.com',
// // // // // // // // // // // //     contactNumber: '123-456-7890',
// // // // // // // // // // // //     address: '123 Main St,galle',
// // // // // // // // // // // //     profilePhoto: 'default-profile-photo.jpg'
// // // // // // // // // // // //   });

// // // // // // // // // // // //   const handleChange = (e) => {
// // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // //     setProfileData(prevState => ({
// // // // // // // // // // // //       ...prevState,
// // // // // // // // // // // //       [name]: value
// // // // // // // // // // // //     }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleProfilePhotoChange = (e) => {
// // // // // // // // // // // //     // Implement logic to handle profile photo upload
// // // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // // //     // Set profile photo to the uploaded file
// // // // // // // // // // // //     setProfileData(prevState => ({
// // // // // // // // // // // //       ...prevState,
// // // // // // // // // // // //       profilePhoto: URL.createObjectURL(file)
// // // // // // // // // // // //     }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleUpdateProfile = () => {
// // // // // // // // // // // //     // Implement logic to update user profile
// // // // // // // // // // // //     console.log('Updating user profile:', profileData);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleDeleteProfile = () => {
// // // // // // // // // // // //     // Implement logic to delete user profile
// // // // // // // // // // // //     console.log('Deleting user profile:', profileData);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="UserProfile">
// // // // // // // // // // // //       <div className="profilePhotoContainer">
// // // // // // // // // // // //         <img src={profileData.profilePhoto} alt="Profile" />
// // // // // // // // // // // //         <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
// // // // // // // // // // // //         <button>Edit Profile Photo</button>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //       <div className="profileInfo">
// // // // // // // // // // // //         <label htmlFor="userName">User Name:</label>
// // // // // // // // // // // //         <input type="text" id="userName" name="userName" value={profileData.userName} onChange={handleChange} />

// // // // // // // // // // // //         <label htmlFor="email">Email:</label>
// // // // // // // // // // // //         <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange} />

// // // // // // // // // // // //         <label htmlFor="contactNumber">Contact Number:</label>
// // // // // // // // // // // //         <input type="text" id="contactNumber" name="contactNumber" value={profileData.contactNumber} onChange={handleChange} />

// // // // // // // // // // // //         <label htmlFor="address">Address:</label>
// // // // // // // // // // // //         <textarea id="address" name="address" value={profileData.address} onChange={handleChange} />

// // // // // // // // // // // //         <button onClick={handleUpdateProfile}>Update Profile</button>
// // // // // // // // // // // //         <button onClick={handleDeleteProfile}>Delete Profile</button>
// // // // // // // // // // // //         <button>Create Pet Profile</button>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // export default UserProfile;

// // // // // // // // // // // // MyProfile.js

// // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // import Header from '../components/Header';
// // // // // // // // // // // import Footer from '../components/Footer';

// // // // // // // // // // // const MyProfile = () => {
// // // // // // // // // // //   const [customerData, setCustomerData] = useState(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchCustomerData = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         // Make a request to fetch customer data
// // // // // // // // // // //         const res = await axios.get('http://localhost:9000/customer/yourCustomerIdHere');
// // // // // // // // // // //         setCustomerData(res.data);
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error(error);
// // // // // // // // // // //         // Handle error
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchCustomerData();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <>
// // // // // // // // // // //       <Header />
// // // // // // // // // // //       <div>
// // // // // // // // // // //         {loading ? (
// // // // // // // // // // //           <p>Loading...</p>
// // // // // // // // // // //         ) : (
// // // // // // // // // // //           <div>
// // // // // // // // // // //             <h2>My Profile</h2>
// // // // // // // // // // //             <p>Username: {customerData.username}</p>
// // // // // // // // // // //             <p>Email: {customerData.email}</p>
// // // // // // // // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // // // // // // // //             <p>Address: {customerData.address}</p>
// // // // // // // // // // //             {/* Add more fields as needed */}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>
// // // // // // // // // // //       <Footer />
// // // // // // // // // // //     </>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default MyProfile;
// // // // // // // // // // // MyProfile.js

// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import axios from 'axios';
// // // // // // // // // // import Header from '../components/Header';
// // // // // // // // // // import Footer from '../components/Footer';

// // // // // // // // // // const MyProfile = () => {
// // // // // // // // // //   const [customerData, setCustomerData] = useState(null);
// // // // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchCustomerData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         // Make a request to fetch customer data
// // // // // // // // // //         const res = await axios.get('http://localhost:9000/customer/yourCustomerIdHere');
// // // // // // // // // //         setCustomerData(res.data);
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.error(error);
// // // // // // // // // //         // Handle error
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchCustomerData();
// // // // // // // // // //   }, []);

// // // // // // // // // //   return (
// // // // // // // // // //     <>
// // // // // // // // // //       <Header />
// // // // // // // // // //       <div>
// // // // // // // // // //         {loading ? (
// // // // // // // // // //           <p>Loading...</p>
// // // // // // // // // //         ) : (
// // // // // // // // // //           <div>
// // // // // // // // // //             <h2>My Profile</h2>
// // // // // // // // // //             <p>Username: {customerData.username}</p>
// // // // // // // // // //             <p>Email: {customerData.email}</p>
// // // // // // // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // // // // // // //             <p>Address: {customerData.address}</p>
// // // // // // // // // //             {/* Add more fields as needed */}
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //       <Footer />
// // // // // // // // // //     </>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MyProfile;

// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import axios from 'axios';
// // // // // // // // // import Header from '../components/Header';
// // // // // // // // // import Footer from '../components/Footer';
// // // // // // // // // import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

// // // // // // // // // const MyProfile = () => {
// // // // // // // // //   const [customerData, setCustomerData] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const { customerId } = useParams(); // Extract customerId from URL parameters

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchCustomerData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         // Make a request to fetch customer data using the customerId
// // // // // // // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // // // // // // //         setCustomerData(res.data);
// // // // // // // // //         setLoading(false);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error(error);
// // // // // // // // //         // Handle error
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchCustomerData();
// // // // // // // // //   }, [customerId]); // Add customerId to dependency array

// // // // // // // // //   return (
// // // // // // // // //     <>
// // // // // // // // //       <Header />
// // // // // // // // //       <div>
// // // // // // // // //         {loading ? (
// // // // // // // // //           <p>Loading...</p>
// // // // // // // // //         ) : (
// // // // // // // // //           <div>
// // // // // // // // //             <h2>My Profile</h2>
// // // // // // // // //             <p>Username: {customerData.username}</p>
// // // // // // // // //             <p>Email: {customerData.email}</p>
// // // // // // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // // // // // //             <p>Address: {customerData.address}</p>
// // // // // // // // //             {/* Add more fields as needed */}
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //       <Footer />
// // // // // // // // //     </>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default MyProfile;
// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import Header from '../components/Header';
// // // // // // // // import Footer from '../components/Footer';
// // // // // // // // import { useParams } from 'react-router-dom';

// // // // // // // // const MyProfile = () => {
// // // // // // // //   const [customerData, setCustomerData] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const { customerId } = useParams();

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchCustomerData = async () => {
// // // // // // // //       try {
// // // // // // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // // // // // //         setCustomerData(res.data);
// // // // // // // //         setLoading(false);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error(error);
// // // // // // // //         // Handle error
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchCustomerData();
// // // // // // // //   }, [customerId]);
  

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       <Header />
// // // // // // // //       <div>
// // // // // // // //         {loading ? (
// // // // // // // //           <p>Loading...</p>
// // // // // // // //         ) : (
// // // // // // // //           <div>
// // // // // // // //             <h2>My Profile</h2>
// // // // // // // //             <p>Username: {customerData.username}</p>
// // // // // // // //             <p>Email: {customerData.email}</p>
// // // // // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // // // // //             <p>Address: {customerData.address}</p>
// // // // // // // //             {/* Add more fields as needed */}
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //       <Footer />
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default MyProfile;
// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import Header from '../components/Header';
// // // // // // // import Footer from '../components/Footer';
// // // // // // // import { useParams } from 'react-router-dom';

// // // // // // // const MyProfile = () => {
// // // // // // //   const [customerData, setCustomerData] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const { customerId } = useParams(); // Extracting customer ID from the URL parameter

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchCustomerData = async () => {
// // // // // // //       try {
// // // // // // //         // Fetching customer data based on the ID from the URL parameter
// // // // // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // // // // //         setCustomerData(res.data); // Setting the retrieved customer data
// // // // // // //         setLoading(false); // Updating loading state after data retrieval
// // // // // // //       } catch (error) {
// // // // // // //         console.error(error);
// // // // // // //         // Handle error
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchCustomerData(); // Fetch customer data on component mount
// // // // // // //   }, [customerId]); // Re-fetch data when the customer ID changes

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       <Header />
// // // // // // //       <div>
// // // // // // //         {loading ? ( // Render loading message while data is being fetched
// // // // // // //           <p>Loading...</p>
// // // // // // //         ) : (
// // // // // // //           <div>
// // // // // // //             <h2>My Profile</h2>
// // // // // // //             {/* Display customer data if available */}
// // // // // // //             <p>Username: {customerData.username}</p>
// // // // // // //             <p>Email: {customerData.email}</p>
// // // // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // // // //             <p>Address: {customerData.address}</p>
// // // // // // //             {/* Add more fields as needed */}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //       <Footer />
// // // // // // //     </>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default MyProfile;
// // // // // // // MyProfile.js

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import Header from '../components/Header';
// // // // // // import Footer from '../components/Footer';
// // // // // // import { useParams } from 'react-router-dom';

// // // // // // const MyProfile = () => {
// // // // // //   const [customerData, setCustomerData] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const { customerId } = useParams();

// // // // // //   useEffect(() => {
// // // // // //     const fetchCustomerData = async () => {
// // // // // //       try {
// // // // // //         console.log("Fetching customer data for ID:", customerId); // Debugging statement
// // // // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // // // //         console.log("Response from server:", res.data); // Debugging statement
// // // // // //         setCustomerData(res.data);
// // // // // //         setLoading(false);
// // // // // //       } catch (error) {
// // // // // //         console.error(error);
// // // // // //         // Handle error
// // // // // //       }
// // // // // //     };

// // // // // //     fetchCustomerData();
// // // // // //   }, [customerId]);

// // // // // //   // Debugging statement
// // // // // //   console.log("Customer data:", customerData);

// // // // // //   return (
// // // // // //     <>
// // // // // //       <Header />
// // // // // //       <div>
// // // // // //         {loading ? (
// // // // // //           <p>Loading...</p>
// // // // // //         ) : (
// // // // // //           <div>
// // // // // //             <h2>My Profile</h2>
// // // // // //             {/* Display customer data if available */}
// // // // // //             <p>Username: {customerData.username}</p>
// // // // // //             <p>Email: {customerData.email}</p>
// // // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // // //             <p>Address: {customerData.address}</p>
// // // // // //             {/* Add more fields as needed */}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //       <Footer />
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default MyProfile;
// // // // // // MyProfile.js

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import Header from '../components/Header';
// // // // // import Footer from '../components/Footer';
// // // // // import { useParams } from 'react-router-dom';

// // // // // const MyProfile = () => {
// // // // //   const [customerData, setCustomerData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const { customerId } = useParams();

// // // // //   useEffect(() => {
// // // // //     const fetchCustomerData = async () => {
// // // // //       try {
// // // // //         console.log("Fetching customer data for ID:", customerId);
// // // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // // //         console.log("Response from server:", res.data);
// // // // //         setCustomerData(res.data);
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching customer data:", error);
// // // // //         setLoading(false); // Update loading state even in case of error
// // // // //       }
// // // // //     };

// // // // //     fetchCustomerData();
// // // // //   }, [customerId]);

// // // // //   console.log("Loading state:", loading);
// // // // //   console.log("Customer data:", customerData);

// // // // //   return (
// // // // //     <>
// // // // //       <Header />
// // // // //       <div>
// // // // //         {loading ? (
// // // // //           <p>Loading...</p>
// // // // //         ) : (
// // // // //           <div>
// // // // //             <h2>My Profile</h2>
// // // // //             {/* Display customer data if available */}
// // // // //             {customerData ? (
// // // // //               <>
// // // // //                 <p>Username: {customerData.username}</p>
// // // // //                 <p>Email: {customerData.email}</p>
// // // // //                 <p>Contact Number: {customerData.contactNumber}</p>
// // // // //                 <p>Address: {customerData.address}</p>
// // // // //                 {/* Add more fields as needed */}
// // // // //               </>
// // // // //             ) : (
// // // // //               <p>No customer data available.</p>
// // // // //             )}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //       <Footer />
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default MyProfile;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import Header from '../components/Header';
// // // // // import Footer from '../components/Footer';
// // // // // import { useParams } from 'react-router-dom';

// // // // // const MyProfile = () => {
// // // // //   const [customerData, setCustomerData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const { customerId } = useParams(); // Extract customerId from URL parameters

// // // // //   useEffect(() => {
// // // // //     const fetchCustomerData = async () => {
// // // // //       try {
// // // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // // //         setCustomerData(res.data);
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error(error);
// // // // //         // Handle error
// // // // //       }
// // // // //     };

// // // // //     fetchCustomerData();
// // // // //   }, [customerId]);
  

// // // // //   return (
// // // // //     <>
// // // // //       <Header />
// // // // //       <div>
// // // // //         {loading ? (
// // // // //           <p>Loading...</p>
// // // // //         ) : (
// // // // //           <div>
// // // // //             <h2>My Profile</h2>
// // // // //             <p>Username: {customerData.username}</p>
// // // // //             <p>Email: {customerData.email}</p>
// // // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // // //             <p>Address: {customerData.address}</p>
// // // // //             {/* Add more fields as needed */}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //       <Footer />
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default MyProfile;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import Header from '../components/Header';
// // // // import Footer from '../components/Footer';
// // // // import { useParams } from 'react-router-dom';
// // // // import '../css/myprofile.css'; // Import the CSS file

// // // // const MyProfile = () => {
// // // //   const [customerData, setCustomerData] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const { customerId } = useParams(); // Extract customerId from URL parameters

// // // //   useEffect(() => {
// // // //     const fetchCustomerData = async () => {
// // // //       try {
// // // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // // //         setCustomerData(res.data);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         console.error(error);
// // // //         // Handle error
// // // //       }
// // // //     };

// // // //     fetchCustomerData();
// // // //   }, [customerId]);

// // // //   return (
// // // //     <>
// // // //       <Header />
// // // //       <div className="MyProfileContainer">
// // // //         {loading ? (
// // // //           <p className="LoadingIndicator">Loading...</p>
// // // //         ) : (
// // // //           <div className="ProfileCard">
// // // //             <h2>My Profile</h2>
// // // //             <p>Username: {customerData.username}</p>
// // // //             <p>Email: {customerData.email}</p>
// // // //             <p>Contact Number: {customerData.contactNumber}</p>
// // // //             <p>Address: {customerData.address}</p>
// // // //             {/* Add more fields as needed */}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //       <Footer />
// // // //     </>
// // // //   );
// // // // };

// // // // export default MyProfile;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';
// // // import { useParams } from 'react-router-dom';
// // // import '../css/myprofile.css'; // Import the CSS file

// // // const MyProfile = () => {
// // //   const [customerData, setCustomerData] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const { customerId } = useParams(); // Extract customerId from URL parameters

// // //   useEffect(() => {
// // //     const fetchCustomerData = async () => {
// // //       try {
// // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // //         setCustomerData(res.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error(error);
// // //         // Handle error
// // //       }
// // //     };

// // //     fetchCustomerData();
// // //   }, [customerId]);

// // //   const handleEditProfile = () => {
// // //     // Implement edit profile logic here
// // //     console.log('Editing profile...');
// // //   };

// // //   const handleDeleteProfile = () => {
// // //     // Implement delete profile logic here
// // //     console.log('Deleting profile...');
// // //   };

// // //   const handlePasswordReset = () => {
// // //     // Implement password reset logic here
// // //     console.log('Resetting password...');
// // //   };

// // //   const handleAddPet = () => {
// // //     // Implement add pet logic here
// // //     console.log('Adding pet...');
// // //   };

// // //   const handleProfilePhotoChange = (e) => {
// // //     // Implement logic to handle profile photo upload
// // //     const file = e.target.files[0];
// // //     // Set profile photo to the uploaded file
// // //     setCustomerData((prevData) => ({
// // //       ...prevData,
// // //       profilePhoto: URL.createObjectURL(file)
// // //     }));
// // //   };

// // //   return (
// // //     <>
// // //       <Header />
// // //       <div className="MyProfileContainer">
// // //         {loading ? (
// // //           <p className="LoadingIndicator">Loading...</p>
// // //         ) : (
// // //           <div className="ProfileCard">
// // //             <div className="ProfileHeader">
// // //               <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto" />
// // //               <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
// // //             </div>
// // //             <h2>My Profile</h2>
// // //             <p>Username: {customerData.username}</p>
// // //             <p>Email: {customerData.email}</p>
// // //             <p>Contact Number: {customerData.contactNumber}</p>
// // //             <p>Address: {customerData.address}</p>
// // //             <button onClick={handleEditProfile}>Edit Profile</button>
// // //             <button onClick={handleDeleteProfile}>Delete Profile</button>
// // //             <button onClick={handlePasswordReset}>Reset Password</button>
// // //             <button onClick={handleAddPet}>Add Pet</button>
// // //           </div>
// // //         )}
// // //       </div>
// // //       <Footer />
// // //     </>
// // //   );
// // // };

// // // // export default MyProfile;
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';
// // // import { useParams } from 'react-router-dom';
// // // import '../css/myprofile.css'; // Import the CSS file

// // // const MyProfile = () => {
// // //   const [customerData, setCustomerData] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const { customerId } = useParams(); // Extract customerId from URL parameters

// // //   useEffect(() => {
// // //     const fetchCustomerData = async () => {
// // //       try {
// // //         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
// // //         setCustomerData(res.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error(error);
// // //         // Handle error
// // //       }
// // //     };

// // //     fetchCustomerData();
// // //   }, [customerId]);

// // //   const handleEditProfile = () => {
// // //     // Implement edit profile logic here
// // //     console.log('Editing profile...');
// // //   };

// // //   const handleDeleteProfile = () => {
// // //     // Implement delete profile logic here
// // //     console.log('Deleting profile...');
// // //   };

// // //   const handlePasswordReset = () => {
// // //     // Implement password reset logic here
// // //     console.log('Resetting password...');
// // //   };

// // //   const handleAddPet = () => {
// // //     // Implement add pet logic here
// // //     console.log('Adding pet...');
// // //   };

// // //   const handleProfilePhotoChange = (e) => {
// // //     // Implement logic to handle profile photo upload
// // //     const file = e.target.files[0];
// // //     // Set profile photo to the uploaded file
// // //     setCustomerData((prevData) => ({
// // //       ...prevData,
// // //       profilePhoto: URL.createObjectURL(file)
// // //     }));
// // //   };

// // //   return (
// // //     <>
// // //       <Header />
// // //       <div className="MyProfileContainer_custom">
// // //         {loading ? (
// // //           <p className="LoadingIndicator">Loading...</p>
// // //         ) : (
// // //           <div className="ProfileCard_custom">
// // //             <div className="ProfileHeader_custom">
// // //               <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
// // //               <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="ProfilePhotoInput_custom" />
// // //             </div>
// // //             <h2>My Profile</h2>
// // //             <p>Username: {customerData.username}</p>
// // //             <p>Email: {customerData.email}</p>
// // //             <p>Contact Number: {customerData.contactNumber}</p>
// // //             <p>Address: {customerData.address}</p>
// // //             <button onClick={handleEditProfile} className="EditButton_custom">Edit Profile</button>
// // //             <button onClick={handleDeleteProfile} className="DeleteButton_custom">Delete Profile</button>
// // //             <button onClick={handlePasswordReset} className="ResetPasswordButton_custom">Reset Password</button>
// // //             <button onClick={handleAddPet} className="MyPetsButton_custom">Add Pet</button>
// // //           </div>
// // //         )}
// // //       </div>
// // //       <Footer />
// // //     </>
// // //   );
// // // };

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
// //             <div className="ProfileHeader_custom">
// //               <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
// //               <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="ProfilePhotoInput_custom" />
// //             </div>
// //             <h2>My Profile</h2>
// //             <p>Username: {customerData.username}</p>
// //             <p>Email: {customerData.email}</p>
// //             <p>Contact Number: {customerData.contactNumber}</p>
// //             <p>Address: {customerData.address}</p>
// //             <button onClick={handleEditProfile} className="EditButton_custom">Edit Profile</button>
// //             <button onClick={handlePasswordReset} className="ResetPasswordButton_custom">Reset Password</button>
// //             <br></br>
// //             <button onClick={handleDeleteProfile} className="DeleteButton_custom">Delete Profile</button>
// //             <button onClick={handleAddPet} className="MyPetsButton_custom">My Pets</button>
// //           </div>
// //         )}
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default MyProfile;
// // export default MyProfile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams } from 'react-router-dom';
// import '../css/myprofile.css'; // Import the CSS file

// const MyProfile = () => {
//   const [customerData, setCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { customerId } = useParams(); // Extract customerId from URL parameters

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

//   const handleDeleteProfile = () => {
//     // Implement delete profile logic here
//     console.log('Deleting profile...');
//   };

//   const handlePasswordReset = () => {
//     // Implement password reset logic here
//     console.log('Resetting password...');
//   };

//   const handleAddPet = () => {
//     // Implement add pet logic here
//     console.log('Adding pet...');
//   };

//   const handleProfilePhotoChange = (e) => {
//     // Implement logic to handle profile photo upload
//     const file = e.target.files[0];
//     // Set profile photo to the uploaded file
//     setCustomerData((prevData) => ({
//       ...prevData,
//       profilePhoto: URL.createObjectURL(file)
//     }));
//   };

//   return (
//     <>
//       <Header />
//       <div className="MyProfileContainer_custom">
//         {loading ? (
//           <p className="LoadingIndicator">Loading...</p>
//         ) : (
//           <div className="ProfileCard_custom">
//             <div className="ProfileHeader_custom">
//               <img src={customerData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
//               <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="ProfilePhotoInput_custom" />
//               <button onClick={handleAddPet} className="MyPetsButton_custom">My Pets</button>
//             </div>
//             <h2>My Profile</h2>
//             <p>Username: {customerData.username}</p>
//             <p>Email: {customerData.email}</p>
//             <p>Contact Number: {customerData.contactNumber}</p>
//             <p>Address: {customerData.address}</p>
//             <button onClick={handleEditProfile} className="EditButton_custom">Edit Profile</button>
//             <button onClick={handlePasswordReset} className="ResetPasswordButton_custom">Reset Password</button>
//             <button onClick={handleDeleteProfile} className="DeleteButton_custom">Delete Profile</button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyProfile;
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
            <h2>My Profile</h2>
            <p>Username: {customerData.username}</p>
            <p>Email: {customerData.email}</p>
            <p>Contact Number: {customerData.contactNumber}</p>
            <p>Address: {customerData.address}</p>
            <button onClick={handlePasswordReset} className="ResetPasswordButton_custom">Reset Password</button>
            </div>
            <br></br>
            <div>
            <button onClick={handleEditProfile} className="EditButton_custom">Edit Profile</button>
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
