// // EditProfile.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const EditProfile = () => {
//   const { customerId } = useParams();
//   const [customerData, setCustomerData] = useState({
//     username: '',
//     email: '',
//     contactNumber: '',
//     address: '',
//   });

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
//         setCustomerData(res.data);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchCustomerData();
//   }, [customerId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData({ ...customerData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:9000/customer/${customerId}`, customerData);
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to update profile');
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input type="text" name="username" value={customerData.username} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={customerData.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input type="text" name="contactNumber" value={customerData.contactNumber} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input type="text" name="address" value={customerData.address} onChange={handleChange} />
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/editprofile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditProfile = () => {
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState({
      username: '',
      email: '',
      contactNumber: '',
      address: '',
    });
  
    useEffect(() => {
      const fetchCustomerData = async () => {
        try {
          const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
          setCustomerData(res.data); // Update customerData state with fetched data
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
  
      fetchCustomerData();
    }, [customerId]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCustomerData({ ...customerData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:9000/customer/${customerId}`, customerData);
        alert('Profile updated successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to update profile');
      }
    };
  
    return (
        <>
    <Header />
    <br></br>
      <div className="edit-profile-container">
        <center><h2>Edit Profile</h2></center>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={customerData.username} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={customerData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={customerData.contactNumber} onChange={handleChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" value={customerData.address} onChange={handleChange} />
          </div>
          <center><button type="submit">Save</button></center>
        </form>
        <Link to={`/MyProfile/${customerId}`} className="back-to-profile-button">Back to My Profile</Link>
      </div>
    <Footer />
    </>
);
  };
  
  export default EditProfile;