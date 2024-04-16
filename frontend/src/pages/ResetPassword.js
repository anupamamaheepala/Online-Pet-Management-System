// // // // // import React, { useState } from 'react';
// // // // // import axios from 'axios';
// // // // // import Header from '../components/Header';
// // // // // import Footer from '../components/Footer';

// // // // // const ResetPassword = () => {
// // // // //   const [formData, setFormData] = useState({
// // // // //     currentPassword: '',
// // // // //     newPassword: '',
// // // // //     confirmPassword: ''
// // // // //   });

// // // // //   const { currentPassword, newPassword, confirmPassword } = formData;

// // // // //   const onChange = e => {
// // // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const onSubmit = async e => {
// // // // //     e.preventDefault();

// // // // //     try {
// // // // //       const res = await axios.post('http://localhost:9000/customer/reset-password', formData);
// // // // //       console.log(res.data); // Check the response from the server

// // // // //       // Handle success message or redirect as needed

// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       // Handle error message
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <Header />
// // // // //       <div>
// // // // //         <div>
// // // // //           <br />
// // // // //           <div>
// // // // //             <h2><center>Reset Password</center></h2>
// // // // //             <div>
// // // // //               <form onSubmit={onSubmit}>
// // // // //                 <div>
// // // // //                   <label htmlFor="currentPassword">Current Password:</label>
// // // // //                   <input type="password" name="currentPassword" value={currentPassword} onChange={onChange} required />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label htmlFor="newPassword">New Password:</label>
// // // // //                   <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label htmlFor="confirmPassword">Confirm New Password:</label>
// // // // //                   <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
// // // // //                 </div>
// // // // //                 <div style={{ textAlign: 'center' }}>
// // // // //                   <button type="submit">Reset Password</button>
// // // // //                 </div>
// // // // //               </form>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //       <br />
// // // // //       <Footer />
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default ResetPassword;
// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';
// // // // import Header from '../components/Header';
// // // // import Footer from '../components/Footer';

// // // // const ResetPassword = () => {
// // // //   const [formData, setFormData] = useState({
// // // //     currentPassword: '',
// // // //     newPassword: '',
// // // //     confirmPassword: ''
// // // //   });

// // // //   const { currentPassword, newPassword, confirmPassword } = formData;

// // // //   const onChange = e => {
// // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // //   };

  
// // // //   const onSubmit = async (e) => {
// // // //     e.preventDefault();
  
// // // //     try {
// // // //       const res = await axios.post('http://localhost:9000/customer/reset-password', formData);
// // // //       if (res && res.data) {
// // // //         console.log(res.data); // Check the response from the server
// // // //         // Handle success message or redirect as needed
// // // //       } else {
// // // //         console.log('Empty response or data from server');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       // Handle error message
// // // //     }
// // // //   };
  

// // // //   return (
// // // //     <>
// // // //       <Header />
// // // //       <div>
// // // //         <div>
// // // //           <br />
// // // //           <div>
// // // //             <h2><center>Reset Password</center></h2>
// // // //             <div>
// // // //               <form onSubmit={onSubmit}>
// // // //                 <div>
// // // //                   <label htmlFor="currentPassword">Current Password:</label>
// // // //                   <input type="password" name="currentPassword" value={currentPassword} onChange={onChange} required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label htmlFor="newPassword">New Password:</label>
// // // //                   <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label htmlFor="confirmPassword">Confirm New Password:</label>
// // // //                   <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
// // // //                 </div>
// // // //                 <div style={{ textAlign: 'center' }}>
// // // //                   <button type="submit">Reset Password</button>
// // // //                 </div>
// // // //               </form>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <br />
// // // //       <Footer />
// // // //     </>
// // // //   );
// // // // };

// // // // export default ResetPassword;
// // // // ResetPassword.js

// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';

// // // const ResetPassword = () => {
// // //   const [formData, setFormData] = useState({
// // //     currentPassword: '',
// // //     newPassword: '',
// // //     confirmPassword: ''
// // //   });

// // //   const { currentPassword, newPassword, confirmPassword } = formData;
// // //   const [error, setError] = useState('');

// // //   const onChange = e => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const onSubmit = async e => {
// // //     e.preventDefault();

// // //     try {
// // //       const res = await axios.post('http://localhost:9000/customer/reset-password', formData);
// // //       console.log(res.data); // Check the response from the server

// // //       // Handle success message or redirect as needed
// // //     } catch (err) {
// // //       console.error(err.response.data);
// // //       setError(err.response.data.message || 'An error occurred');
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Header />
// // //       <div>
// // //         <div>
// // //           <br />
// // //           <div>
// // //             <h2><center>Reset Password</center></h2>
// // //             <div>
// // //               <form onSubmit={onSubmit}>
// // //                 <div>
// // //                   <label htmlFor="currentPassword">Current Password:</label>
// // //                   <input type="password" name="currentPassword" value={currentPassword} onChange={onChange} required />
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="newPassword">New Password:</label>
// // //                   <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="confirmPassword">Confirm New Password:</label>
// // //                   <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
// // //                 </div>
// // //                 <div style={{ textAlign: 'center' }}>
// // //                   <button type="submit">Reset Password</button>
// // //                 </div>
// // //                 {error && <p style={{ color: 'red' }}>{error}</p>}
// // //               </form>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <br />
// // //       <Footer />
// // //     </>
// // //   );
// // // };

// // // export default ResetPassword;
// // import React, { useState } from 'react';
// // import axios from 'axios';


// // const ResetPassword = () => {
// //   const [formData, setFormData] = useState({
// //     oldPassword: '',
// //     newPassword: '',
// //     confirmPassword: ''
// //   });

// //   const { oldPassword, newPassword, confirmPassword } = formData;

// //   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const onSubmit = async e => {
// //     e.preventDefault();
  
// //     if (newPassword !== confirmPassword) {
// //       alert('New password and confirm password do not match');
// //       return;
// //     }
  
// //     try {
// //       const token = localStorage.getItem('token');
// //       const userId = localStorage.getItem('userId'); // Assuming you store the user ID in localStorage
// //       console.log('userId:', userId); // Log userId to verify its format
// //       const res = await axios.put('http://localhost:9000/customer/reset-password', { customerId: userId, oldPassword, newPassword }, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
// //       console.log(res.data); // Check response from server
  
// //       // Show success message to the user
// //       alert('Password reset successfully');
      
// //       // Clear form fields
// //       setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to reset password');
// //     }
// //   };
  
  
// //   return (
// //     <form onSubmit={onSubmit}>
// //       <div>
// //         <label>Old Password</label>
// //         <input type="password" name="oldPassword" value={oldPassword} onChange={onChange} required />
// //       </div>
// //       <div>
// //         <label>New Password</label>
// //         <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
// //       </div>
// //       <div>
// //         <label>Confirm New Password</label>
// //         <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
// //       </div>
// //       <button type="submit">Reset Password</button>
// //     </form>
// //   );
// // };

// // export default ResetPassword;
// import React, { useState } from 'react';
// import axios from 'axios';

// const ResetPassword = () => {
//   const [formData, setFormData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const { oldPassword, newPassword, confirmPassword } = formData;

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//  // Inside your onSubmit function in ResetPassword component
//  const onSubmit = async e => {
//   e.preventDefault();

//   // Get userId from props
//   const userId = props.userId;

//   try {
//     const res = await axios.put('http://localhost:9000/customer/reset-password', {
//       customerId: userId, // Send userId as customerId
//       oldPassword,
//       newPassword,
//     });
//     console.log(res.data); // Check response from server

//     // Show success message to the user
//     alert('Password reset successfully');
    
//     // Clear form fields
//     setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
//   } catch (err) {
//     console.error(err);
//     alert('Failed to reset password');
//   }
// };



//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         <label>Old Password</label>
//         <input type="password" name="oldPassword" value={oldPassword} onChange={onChange} required />
//       </div>
//       <div>
//         <label>New Password</label>
//         <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
//       </div>
//       <div>
//         <label>Confirm New Password</label>
//         <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
//       </div>
//       <button type="submit">Reset Password</button>
//     </form>
//   );
// };

// export default ResetPassword;
import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ userId }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { oldPassword, newPassword, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.put('http://localhost:9000/customer/reset-password', {
        customerId: userId,
        oldPassword,
        newPassword,
      });
      console.log(res.data); // Check response from server

      // Show success message to the user
      alert('Password reset successfully');
      
      // Clear form fields
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to reset password');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Old Password</label>
        <input type="password" name="oldPassword" value={oldPassword} onChange={onChange} required />
      </div>
      <div>
        <label>New Password</label>
        <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
