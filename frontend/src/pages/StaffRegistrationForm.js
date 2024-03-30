import React, { useState } from 'react';
import '../css/StaffRegister.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
    <>
    <Header />
    <body>
      <br></br>

    <div className="staffRegistration-form">
      <h2>Register As Staff</h2>
      <br></br>

      <form onSubmit={handleSubmit} className='staffregister-form'>
        <div className="staffregister-form-group">
          <label>Name:</label>
          <input type="text" name="sname" value={formData.sname} onChange={handleChange} />
        </div>
        <div className="staffregister-form-group">
          <label>Email:</label>
          <input type="email" name="semail" value={formData.semail} onChange={handleChange} />
        </div>
        <div className="staffregister-form-group">
          <label>Contact Number:</label>
          <input type="tel" name="scontactNumber" value={formData.scontactNumber} onChange={handleChange} />
        </div>
        <div className="staffregister-form-group">
          <label>Address:</label>
          <input type="text" name="saddress" value={formData.saddress} onChange={handleChange} />
        </div>
        <div className="staffregister-form-group">
          <label>Designation:</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
        </div>
        <br></br>
        <center><button type="submit" className='staffRegisterButton'>Submit</button></center>
      </form>
      <br></br>

    </div>
    <br></br>
    </body>
    <Footer />
    </>
  );
}

export default StaffRegister;