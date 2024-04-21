import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/StaffRegister.css';

const UpdateStaff = () => {
  
  const { staffId } = useParams();
  const [formData, setFormData] = useState({
    sfirstname: '',
    slastname: '',
    snic: '',
    semail: '',
    scontactNumber: '',
    saddress: '',
    designation: '',
    qualifications: ''
  });

  const [contactNumberError, setContactNumberError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9000/staff/${staffId}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch staff data');
      });
  }, [staffId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'scontactNumber') {
      if (value === '' || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setContactNumberError('');
      } else {
        setContactNumberError('Contact number should contain only numbers');
      }
    } else if (name === 'sfirstname' || name === 'slastname') {
      if (/^[a-zA-Z\s]*$/.test(value) || value === '' || value.slice(0, -1) === formData[name].slice(0, -1)) {
        setFormData({ ...formData, [name]: value });
        if (name === 'sfirstname') {
          setFirstnameError('');
        } else {
          setLastnameError('');
        }
      } else {
        if (name === 'sfirstname') {
          setFirstnameError('First name should contain only letters and spaces');
        } else {
          setLastnameError('Last name should contain only letters and spaces');
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9000/staff/${staffId}`, formData)
      .then((res) => {
        console.log(res.data);
        alert('Staff updated successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update staff');
      });
  };

  return (
    <>
      <Header />
      <br></br>
      <div className="Update-staffRegistration-form">
        <h2>Update Staff Details</h2>
        <br></br>

        <form onSubmit={handleSubmit} className='UpadateStaffregister-form'>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>First Name:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="sfirstname" value={formData.sfirstname} onChange={handleChange} required />
            {firstnameError && <span className="error">{firstnameError}</span>}
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Last Name:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="slastname" value={formData.slastname} onChange={handleChange} required />
            {lastnameError && <span className="error">{lastnameError}</span>}
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>NIC No:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="snic" value={formData.snic} onChange={handleChange} maxLength={12} required />
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Email:</label>
            <input className="UpadateStaffregister-form-input" type="email" name="semail" value={formData.semail} onChange={handleChange} required />
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Contact Number:</label>
            <input className="UpadateStaffregister-form-input" type="tel" name="scontactNumber" value={formData.scontactNumber} onChange={handleChange} maxLength={10} required />
            {contactNumberError && <span className="error">{contactNumberError}</span>}
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Address:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="saddress" value={formData.saddress} onChange={handleChange} required />
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Designation:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="designation" value={formData.designation} onChange={handleChange} required />
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Qualifications:</label>
            <textarea name="qualifications" id="qualifications" value={formData.qualifications} onChange={handleChange} rows={4} cols={50} />
        </div>
          <br></br>
          <center><button className="UpadateStaff-button" type="submit">Update</button></center>
        </form>
        <br></br>

      </div>

      <br></br>

      <Footer />
    </>
  );
};

export default UpdateStaff;
