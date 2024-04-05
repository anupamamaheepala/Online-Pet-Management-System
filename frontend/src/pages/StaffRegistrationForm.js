import React, { useState } from 'react';
import '../css/StaffRegister.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    sfirstname: '',
    slastname: '',
    snic: '',
    semail: '',
    scontactNumber: '',
    saddress: '',
    designation: ''
  });

  const { sfirstname, slastname, snic,semail, scontactNumber, saddress, designation } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const onSubmit = async e => {
  e.preventDefault();
  try {
      const res = await axios.post("http://localhost:9000/staff/add", formData);
      console.log(res.data);
      // Optionally, you can clear the form fields after successful submission
      setFormData({
        sfirstname: '',
        slastname: '',
        snic: '',
        semail: '',
        scontactNumber: '',
        saddress: '',
        designation: '',
      });
  } catch (err) {
      console.error(err);
  }
};

  return (
    <>
    <Header />
    
      <br></br>

    <div className="staffRegistration-form">
      <h2>Register As Staff</h2>
      <br></br>

      <form onSubmit={onSubmit} className='staffregister-form'>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>First Name:</label>
          <input type="text" name="sfirstname" id='sfirstname' value={formData.sfirstname} onChange={onChange} required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Last Name:</label>
          <input type="text" name="slastname" id='slastname' value={formData.slastname} onChange={onChange} required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>NIC No:</label>
          <input type="text" name="snic" id='snic' value={formData.snic} onChange={onChange} maxLength={12} required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Email:</label>
          <input type="email" name="semail" id='semail' value={formData.semail} onChange={onChange} required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Contact Number:</label>
          <input type="tel" name="scontactNumber" id='scontactNumber' value={formData.scontactNumber} onChange={onChange} maxLength={10} required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Address:</label>
          <input type="text" name="saddress" id='saddress' value={formData.saddress} onChange={onChange}required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Designation:</label>
          <input type="text" name="designation" id='designation' value={formData.designation} onChange={onChange}required />
        </div>
        <br></br>
        <center><button type="submit" className='staffRegisterButton'>Submit</button></center>
      </form>
      <br></br>

    </div>
    <br></br>
    
    <Footer />
    </>
  );
}

export default StaffRegister;