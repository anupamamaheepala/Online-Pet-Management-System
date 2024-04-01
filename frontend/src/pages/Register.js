// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register =  () =>{
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const { username, email, contactNumber, address, password, confirmPassword } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/customer/register", formData);
            console.log(res.data);
            // Optionally, you can clear the form fields after successful submission
            setFormData({
              username: '',
              email: '',
              contactNumber: '',
              address: '',
              password: '',
              confirmPassword: '',
                
            });
        } catch (err) {
            console.error(err);
        }
    };

  

  return (
    <>
    <Header />
    <br></br>
      <div className="registration-registration-form">
        <h2>Sign Up To PetZone</h2>
        <br></br>
        <div className="register-content">

        <form onSubmit={onSubmit}>
          <div className="registration-form-group">
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={onChange} />
          </div>
          <div className="registration-form-group">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={onChange} />
          </div>
          <div className="registration-form-group">
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={contactNumber} onChange={onChange} />
          </div>
          <div className="registration-form-group">
            <label>Address:</label>
            <input type="text" name="address" value={address} onChange={onChange} />
          </div>
          <div className="registration-form-group">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={onChange} />
          </div>
          <div className="registration-form-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
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
