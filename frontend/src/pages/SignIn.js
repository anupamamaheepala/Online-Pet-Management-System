// SignIn.js

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/signin.css';

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

      // Redirect to home page if sign-in successful
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Invalid credentials'); // Display an error message
    }
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
            <a href="#">Forgot Password?</a>
          </div>
          <div className="signin-form-group" style={{ textAlign: 'center' }}>
            <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
          </div>
          <div className="signin-form-group">
            <p className="signin-p">Don't have an account? <a href="#">Sign Up</a></p>
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

