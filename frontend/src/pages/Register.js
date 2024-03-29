// Register.js

import React, { useState } from 'react';
import '../css/register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your registration logic here
    console.log(formData);
  };

  return (
    <>
    <Header />
    <br></br>
      <div className="registration-registration-form">
        <h2>Sign Up To PetZone</h2>
        <br></br>
        <div className="register-content">

        <form onSubmit={handleSubmit}>
          <div className="registration-form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="registration-form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="registration-form-group">
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>
          <div className="registration-form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="registration-form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="registration-form-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <center><button className="registration-button" type="submit">Register</button></center>
        </form>
        
        <br />
        <center>
          <label className="registration-staff">Register for staff:</label>
          <button className="registration-staff-registration-btn" onClick={() => console.log('Redirect to staff registration')}>Staff Registration</button>
        </center>
      </div>
      </div>
      <br></br>
      <Footer />
      </>
       );
}

export default Register;
