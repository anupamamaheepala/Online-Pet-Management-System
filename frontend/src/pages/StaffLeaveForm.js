import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/StaffLeaveForm.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VetHeader from '../components/Vet components/VetHeader';
import GroomeHeader from '../components/Groome components/GroomerHeader';

const StaffLeaveForm = ({ designation }) => {
    const { staffId,sfirstname,slastname } = useParams(); // Accessing parameters from URL

    // Initialize form data with staffId
    const [formData, setFormData] = useState({
      staffId: staffId, // Set the staffId from URL params
      StleaveFromDate: '',
      StleaveToDate: '',
      StleaveType: '',
      streason: '',
    }); 

    const [dateError, setDateError] = useState('');

  const { StleaveFromDate, StleaveToDate, StleaveType, streason } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'StleaveFromDate') {
        const selectedFromDate = new Date(value);
        const selectedToDate = new Date(StleaveToDate);
        const currentDate = new Date();
        if (selectedFromDate <= currentDate) {
            setDateError('Leave Date From must be after today');
        } else {
            setDateError('');
        }
        if (selectedToDate < selectedFromDate) {
            setDateError('Leave Date To cannot be before Leave Date From');
        }
    }
    if (name === 'StleaveToDate') {
        const selectedToDate = new Date(value);
        const selectedFromDate = new Date(StleaveFromDate);
        if (selectedToDate < selectedFromDate) {
            setDateError('Leave Date To cannot be before Leave Date From');
        } else {
            setDateError('');
        }
    }
    setFormData({ ...formData, [name]: value });
};


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:9000/staffLeave/addleave', {
            staffId: staffId, // Send staffId from URL params
            ...formData, // Include other form data
        });
  console.log(res.data);
      // Optionally, you can clear the form fields after successful submission
      setFormData({
        ...formData,
        StleaveFromDate: '',
        StleaveToDate: '',
        StleaveType: '',
        streason: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {designation === 'veterinarian' ? (
        
        <VetHeader />
      ) : (
        <GroomeHeader />
      )}

      <br></br><br></br>

      <form onSubmit={onSubmit} className="StaffLeave-Form">
        <h2>Staff Leave Form</h2>
        <div className="StaffLeave-form-group">
          <label className="StaffLeave-form-group label"> Staff ID:</label>
          <input type="text" name="staffId" id="staffId" value={formData.staffId} readOnly />
        </div>

        <div className="StaffLeave-form-group">
          <label className="StaffLeave-form-group label">Leave Date From:</label>
          <input type="date" name="StleaveFromDate" value={StleaveFromDate} onChange={onChange} required />
          {dateError && <p className="error-message">{dateError}</p>}
        </div>


        <div className="StaffLeave-form-group">
          <label className="StaffLeave-form-group label">Leave Date To:</label>
          <input type="date" name="StleaveToDate" value={StleaveToDate} onChange={onChange} required />
        </div>

        <div className="StaffLeave-form-group">
          <label className="StaffLeave-form-group label">Leave Type:</label>
          <select name="StleaveType" value={StleaveType} onChange={onChange} required>
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
            <option value="Personal Leave">Personal Leave</option>
          </select>
        </div>

        <div className="StaffLeave-form-group">
          <label className="StaffLeave-form-group label">Reason:</label>
          <textarea name="streason" value={streason} onChange={onChange} />
        </div>

        <center>
          <button type="submit" className="staffLeaveButton">
            Submit
          </button>
        </center>
      </form>
      <br></br>
      <Footer />
    </>
  );
};

export default StaffLeaveForm;
