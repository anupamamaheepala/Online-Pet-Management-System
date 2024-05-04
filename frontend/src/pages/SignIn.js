// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';
// // // import '../css/signin.css';
// // // import { Link } from 'react-router-dom'; 


// // // const SignIn = () => {
// // //   const [formData, setFormData] = useState({
// // //     email: '',
// // //     password: ''
// // //   });

// // //   const { email, password } = formData;

// // //   const onChange = e => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
    

// // //   };

// // //   const onSubmit = async e => {
// // //     e.preventDefault();
  
// // //   try {
// // //     const res = await axios.post('http://localhost:9000/customer/signin', formData);
// // //     console.log(res.data); // Check the response from the server
  
// // //     // Store the user data in local storage
// // //     localStorage.setItem('userData', JSON.stringify(res.data.user));
  
// // //     // Log the userData
// // //     console.log("User data after sign-in:", res.data.user);
  
// // //     // Redirect to home page if sign-in successful
// // //     window.location.href = '/';
// // //   } catch (err) {
// // //     console.error(err);
// // //     alert('Invalid credentials'); // Display an error message
// // //   }
// // // };
  
  

// // //   const loginAsStaff = () => {
// // //     window.location.href = '/StaffLogin'; // Redirect to staff login page
// // //   };

// // //   return (
    
// // // <>
// // // <Header />
// // //   <div> 
// // //     <div>
// // //       <br />
// // //       <div className="signin-signinform">
// // //         <h2><center>Sign In To PetZone</center></h2>
// // //         <div className="signin-content">
    
// // //     <form onSubmit={onSubmit}>
 
// // //           <div className="signin-form-group">
// // //             <label className="signin-label" htmlFor="email">Email</label>
// // //             <input className="signin-input" type="email" name="email" value={email} onChange={onChange} required />
// // //                       </div>
// // //           <div className="signin-form-group">
// // //             <label className="signin-label" htmlFor="password">Password</label>
// // //             <input  className="signin-input" type="password" name="password" value={password} onChange={onChange} required />
// // //           </div>
// // //           <div className="signin-form-group">
// // //           <Link to="/forgot-password">Forgot Password?</Link>
// // //           </div>
// // //           <div className="signin-form-group" style={{ textAlign: 'center' }}>
// // //             <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
// // //           </div>
// // //           <div className="signin-form-group">
// // //             <p className="signin-p">Don't have an account? <a className='singup-a' href="/register">Sign Up</a></p>
// // //           </div>
// // //           <br></br>
// // //           <div className="signin-form-group" >
// // //           <center><Link to="/StaffLogin" className="staffsignin-button" > Login as Staff </Link></center>    
// // //           </div>

// // //         </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // //   <br></br>
// // // <Footer />
// // // </>
// // //   );
// // // };

// // // export default SignIn;

// // // Import the useState and useEffect hooks
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import '../css/signin.css';
// // import { Link } from 'react-router-dom'; 

// // const SignIn = () => {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   });

// //   const [userData, setUserData] = useState(null); // Add state to store user data

// //   useEffect(() => {
// //     // Check if user data exists in local storage on component mount
// //     const storedUserData = JSON.parse(localStorage.getItem('userData'));
// //     if (storedUserData) {
// //       setUserData(storedUserData);
// //     }
// //   }, []); // Empty dependency array to run this effect only once on mount

// //   const { email, password } = formData;

// //   const onChange = e => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const onSubmit = async e => {
// //     e.preventDefault();
  
// //     try {
// //       const res = await axios.post('http://localhost:9000/customer/signin', formData);
// //       localStorage.setItem('userData', JSON.stringify(res.data.user));
// //       setUserData(res.data.user); // Set the user data after successful sign-in
// //       window.location.href = '/';
// //     } catch (err) {
// //       console.error(err);
// //       alert('Invalid credentials');
// //     }
// //   };

// //   const loginAsStaff = () => {
// //     window.location.href = '/StaffLogin';
// //   };

// //   return (
// //     <>
// //       {/* Pass the userData to the Header component */}
// //       <Header profilePhoto={userData && userData.profilePhoto} />
// //       <div> 
// //         <div>
// //           <br />
// //           <div className="signin-signinform">
// //             <h2><center>Sign In To PetZone</center></h2>
// //             <div className="signin-content">
// //               <form onSubmit={onSubmit}>
// //                 <div className="signin-form-group">
// //                   <label className="signin-label" htmlFor="email">Email</label>
// //                   <input className="signin-input" type="email" name="email" value={email} onChange={onChange} required />
// //                 </div>
// //                 <div className="signin-form-group">
// //                   <label className="signin-label" htmlFor="password">Password</label>
// //                   <input  className="signin-input" type="password" name="password" value={password} onChange={onChange} required />
// //                 </div>
// //                 <div className="signin-form-group">
// //                   <Link to="/forgot-password">Forgot Password?</Link>
// //                 </div>
// //                 <div className="signin-form-group" style={{ textAlign: 'center' }}>
// //                   <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
// //                 </div>
// //                 <div className="signin-form-group">
// //                   <p className="signin-p">Don't have an account? <a className='singup-a' href="/register">Sign Up</a></p>
// //                 </div>
// //                 <br />
// //                 <div className="signin-form-group">
// //                   <center><Link to="/StaffLogin" className="staffsignin-button"> Login as Staff </Link></center>    
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <br />
// //       <Footer />
// //     </>
// //   );
// // };

// // export default SignIn;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/signin.css';
// import { Link } from 'react-router-dom'; 

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [userData, setUserData] = useState(null); // Add state to store user data

//   useEffect(() => {
//     // Check if user data exists in local storage on component mount
//     const storedUserData = JSON.parse(localStorage.getItem('userData'));
//     if (storedUserData) {
//       setUserData(storedUserData);
//     }
//   }, []); // Empty dependency array to run this effect only once on mount

//   const { email, password } = formData;

//   const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
  
//     try {
//       const res = await axios.post('http://localhost:9000/customer/signin', formData);
//       localStorage.setItem('userData', JSON.stringify(res.data.user));
//       setUserData(res.data.user); // Set the user data after successful sign-in
//       window.location.href = '/';
//     } catch (err) {
//       console.error(err);
//       alert('Invalid credentials');
//     }
//   };

//   const loginAsStaff = () => {
//     window.location.href = '/StaffLogin';
//   };

//   return (
//     <>
//       {/* Pass the userData to the Header component */}
//       <Header profilePhoto={userData && userData.profilePhoto} />
//       <div> 
//         <div>
//           <br />
//           <div className="signin-signinform">
//             <h2><center>Sign In To PetZone</center></h2>
//             <div className="signin-content">
//               <form onSubmit={onSubmit}>
//                 <div className="signin-form-group">
//                   <label className="signin-label" htmlFor="email">Email</label>
//                   <input className="signin-input" type="email" name="email" value={email} onChange={onChange} required />
//                 </div>
//                 <div className="signin-form-group">
//                   <label className="signin-label" htmlFor="password">Password</label>
//                   <input  className="signin-input" type="password" name="password" value={password} onChange={onChange} required />
//                 </div>
//                 <div className="signin-form-group">
//                   <Link to="/forgot-password">Forgot Password?</Link>
//                 </div>
//                 <div className="signin-form-group" style={{ textAlign: 'center' }}>
//                   <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
//                 </div>
//                 <div className="signin-form-group">
//                   <p className="signin-p">Don't have an account? <a className='singup-a' href="/register">Sign Up</a></p>
//                 </div>
//                 <br />
//                 <div className="signin-form-group">
//                   <center><Link to="/StaffLogin" className="staffsignin-button"> Login as Staff </Link></center>    
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <br />
//       <Footer />
//     </>
//   );
// };

// export default SignIn;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/signin.css';
import { Link } from 'react-router-dom'; 

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [userData, setUserData] = useState(null); // State to store user data including profile photo

  useEffect(() => {
    // Load user data from local storage if it exists
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const onSubmit = async e => {
  //   e.preventDefault();
  
  //   try {
  //     const res = await axios.post('http://localhost:9000/customer/signin', formData);
  //     const userData = res.data.user;
  //     setUserData(userData); // Set user data after successful sign-in
  //     localStorage.setItem('userData', JSON.stringify(userData));
  //     window.location.href = '/';
  //   } catch (err) {
  //     console.error(err);
  //     alert('Invalid credentials');
  //   }
  // };
  // const onSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('http://localhost:9000/customer/signin', formData);
  //     const userData = res.data.user;
  //     setUserData(userData); // Set user data after successful sign-in
  //     localStorage.setItem('userData', JSON.stringify(userData));
  //     console.log('User data after sign-in:', userData); // Check if userData contains profilePhoto
  //     // window.location.href = '/';
  //     window.location.href = `/?userData=${encodeURIComponent(JSON.stringify(userData))}`;

  //   } catch (err) {
  //     console.error(err);
  //     alert('Invalid credentials');
  //   }
  // };
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/customer/signin', formData);
      const userData = res.data.user;
      console.log('User data after sign-in:', userData);
      setUserData(userData); // Set user data after successful sign-in
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data after sign-in:', userData); // Check if userData contains profilePhoto
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };
  

  const loginAsStaff = () => {
    window.location.href = '/StaffLogin';
  };

  return (
    <>
      <Header profilePhoto={userData && userData.profilePhoto} /> {/* Pass profile photo to Header */}
      <div> 
        <div>
          <br />
          <div className="signin-signinform">
            <h2><center>Sign In To PetZone</center></h2>
            <div className="signin-content">
              <form onSubmit={onSubmit}>
                <div className="signin-form-group">
                  <label className="signin-label" htmlFor="email">Email</label>
                  <input className="signin-input" type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="signin-form-group">
                  <label className="signin-label" htmlFor="password">Password</label>
                  <input  className="signin-input" type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <div className="signin-form-group">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="signin-form-group" style={{ textAlign: 'center' }}>
                  <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
                </div>
                <div className="signin-form-group">
                  <p className="signin-p">Don't have an account? <a className='singup-a' href="/register">Sign Up</a></p>
                </div>
                <br />
                <div className="signin-form-group">
                  <center><Link to="/StaffLogin" className="staffsignin-button"> Login as Staff </Link></center>    
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default SignIn;
