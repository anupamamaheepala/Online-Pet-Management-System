import React, { useState } from 'react';
import '../css/register.css';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

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
    <Layout>
    <body>
      <br></br>
    <div className="registration-form">
      <h2>Sign Up To PetZone</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <center><button style={{width:'200px', backgroundColor: 'black', color: 'white', borderRadius: '19px'}} type="submit">Register</button></center>
      </form>
      <br></br>

      <center><label class name="staff"> <center>Register for staff:</center></label>

     <button style={{width:'150px'}} className="staff-registration-btn" onClick={() => console.log('Redirect to staff registration')}>Staff Registration</button></center>
    </div>
    <br></br>
    </body>
    </Layout>
  );
}

export default Register;