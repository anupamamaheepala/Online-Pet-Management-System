import React, { useState } from 'react';
import '../css/StaffRegister.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    staffId: generateStaffId(), // Custom ID for staff member
    sfirstname: '',
    slastname: '',
    snic: '',
    semail: '',
    scontactNumber: '',
    saddress: '',
    designation: ''
  });

  const [contactNumberError, setContactNumberError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');

  const { staffId, sfirstname, slastname, snic, semail, scontactNumber, saddress, designation } = formData;

  const onChange = e => {
    const { name, value } = e.target;
    
    // Check if the input is for first name or last name
    if (name === 'sfirstname' || name === 'slastname') {
      // Check if the value contains only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
        // If the input contains only letters and spaces or is empty, update the form data and clear error message
        setFormData({ ...formData, [name]: value });
        if (name === 'sfirstname') {
          setFirstnameError('');
        } else {
          setLastnameError('');
        }
      } else {
        // If the input contains invalid characters, display error message
        if (name === 'sfirstname') {
          setFirstnameError('First name should contain only letters and spaces');
        } else {
          setLastnameError('Last name should contain only letters and spaces');
        }
      }
    } else if (name === 'scontactNumber') {
      // Check if the input is for contact number and if it contains non-numeric characters
      if (value === '' || /^\d+$/.test(value)) {
        // If the input is empty or contains only numeric characters, update the form data and clear error message
        setFormData({ ...formData, [name]: value });
        setContactNumberError('');
      } else {
        // If the input contains non-numeric characters, display error message
        setContactNumberError('Contact number should contain only numbers');
      }
    } else {
      // For other input fields, update the form data
      setFormData({ ...formData, [name]: value });
    }
  };
  
  
  
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/staff/add", formData);
      console.log(res.data);
      // Optionally, you can clear the form fields after successful submission
      setFormData({
        staffId: generateStaffId(), // Generate a new staff ID
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

  // Function to generate a unique staff ID
  function generateStaffId() {
    // Generate a random number (you can use any custom logic here)
    const randomNumber = Math.floor(Math.random() * 1000000);
    // Concatenate with a prefix to ensure uniqueness
    return 'STAFF_' + randomNumber;
  }

  return (
    <>
    <Header />
    
      <br></br>

    <div className="staffRegistration-form">
      <h2>Register As Staff</h2>
      <br></br>

      <form onSubmit={onSubmit} className='staffregister-form'>
        <div className="staffregister-form-group">
            <label className='staffregister-form-label'>Staff ID:</label>
            <input type="text" name="staffId" id='staffId' value={staffId} onChange={onChange} readOnly />
          </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>First Name:</label>
          <input type="text" name="sfirstname" id='sfirstname' value={formData.sfirstname} onChange={onChange} required />
          {firstnameError && <span className="error">{firstnameError}</span>}
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Last Name:</label>
          <input type="text" name="slastname" id='slastname' value={formData.slastname} onChange={onChange} required />
          {lastnameError && <span className="error">{lastnameError}</span>}
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
          {contactNumberError && <span className="error">{contactNumberError}</span>}
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Address:</label>
          <input type="text" name="saddress" id='saddress' value={formData.saddress} onChange={onChange} required />
        </div>
        <div className="staffregister-form-group">
          <label className='staffregister-form-label'>Designation:</label>
          <select name="designation" id="designation" className='designation' value={formData.designation} onChange={onChange} required>
            <option value="">Select Designation</option>
            <option value="Veterinarian">Veterinarian</option>
            <option value="Groomer">Groomer</option>
            <option value="Pet Trainer">Pet Trainer</option>
          </select>
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

export default StaffRegister;
