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
    designation: ''
  });

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9000/staff/${staffId}`, formData)
      .then((res) => {
        console.log(res.data);
        alert('Staff updated successfully');
        window.location.href = '/StaffList';
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
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Last Name:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="slastname" value={formData.slastname} onChange={handleChange} required />
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
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Address:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="saddress" value={formData.saddress} onChange={handleChange} required />
          </div>
          <div className="UpadateStaffregister-form-group">
            <label className='UpadateStaffregister-form-label'>Designation:</label>
            <input className="UpadateStaffregister-form-input" type="text" name="designation" value={formData.designation} onChange={handleChange} required />
          </div>
          <br></br>
          <center><button className="UpadateStaff-button" type="submit">Update</button></center>
        &nbsp;
        {/* Navigate to AllCustomers page using Link */}
        <Link to="/StaffList" className="edit-staff-link-button">
          <button className="edit-staff-button">Back to All Staff List</button>
        </Link>
        </form>
        <br></br>

      </div>

      <br></br>

      <Footer />
    </>
  );
};

export default UpdateStaff;
