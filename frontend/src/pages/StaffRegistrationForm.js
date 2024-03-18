import React, { useState } from 'react';
import '../css/StaffRegister.css';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function StaffRegister() {
  const [formData, setFormData] = useState({
    sname: '',
    semail: '',
    scontactNumber: '',
    saddress: '',
    designation: ''
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

    <div className="staffRegistration-form">
      <h2>Register As Staff</h2>
      <br></br>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="sname" value={formData.sname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="semail" value={formData.semail} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" name="scontactNumber" value={formData.scontactNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="saddress" value={formData.saddress} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
        </div>
        <br></br>
        <center><button style={{width:'200px'}} type="submit">Register</button></center>
      </form>
      <br></br>

    </div>
    <br></br>
    </body>
    </Layout>
  );
}

export default StaffRegister;