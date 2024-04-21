import React, { useState } from 'react';
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

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    

  };

  const onSubmit = async e => {
    e.preventDefault();
  
  try {
    const res = await axios.post('http://localhost:9000/customer/signin', formData);
    console.log(res.data); // Check the response from the server
  
    // Store the user data in local storage
    localStorage.setItem('userData', JSON.stringify(res.data.user));
  
    // Log the userData
    console.log("User data after sign-in:", res.data.user);
  
    // Redirect to MyProfile page if sign-in successful
    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert('Invalid credentials'); // Display an error message
  }
};
  
  

  const loginAsStaff = () => {
    window.location.href = '/StaffLogin'; // Redirect to staff login page
  };

  return (
    
<>
<Header />
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
            <a className='singup-a' href="#">Forgot Password?</a>
          </div>
          <div className="signin-form-group" style={{ textAlign: 'center' }}>
            <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
          </div>
          <div className="signin-form-group">
            <p className="signin-p">Don't have an account? <a className='singup-a' href="/register">Sign Up</a></p>
          </div>
          <br></br>
          <div className="signin-form-group" >
          <center><Link to="/StaffLogin" className="staffsignin-button" > Login as Staff </Link></center>    
          </div>

        </form>
        </div>
      </div>
    </div>
  </div>
  <br></br>
<Footer />
</>
  );
};

export default SignIn;

