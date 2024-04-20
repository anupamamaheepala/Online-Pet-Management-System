import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/StaffLeaveForm.css';
import axios from 'axios';

const StaffLeaveForm = () =>{

        const [formData, setFormData] = useState({
          staffId: '',
          sfirstname: '',
          slastname: '',
          StleaveFromDate: '',
          StleaveToDate: '',
          StleaveType: '',
          streason: '',
        });
      
        const { staffId, sfirstname, slastname, StleaveFromDate,StleaveToDate, StleaveType, streason } = formData;
      
        const onChange = e => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
        const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/staffLeave/addleave", formData);
            console.log(res.data);
            // Optionally, you can clear the form fields after successful submission
            setFormData({
              staffId: '',
              sfirstname: '',
              slastname: '',
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
        <Header />
        
        <form onSubmit={onSubmit} className='StaffLeave-Form'>
                <h2>Staff Leave Form</h2>
                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'> Staff ID:</label>
                        <input type="text" name="staffId" id='staffId' value={formData.staffId} onChange={onChange} required  />
                    </div>
                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'>First Name:</label>
                        <input type="text" name="sfirstname" id='sfirstname' value={formData.sfirstname} onChange={onChange} required  />
                    </div>
                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'>Last Name:</label>
                        <input type="text" name="slastname" id='slastname' value={formData.slastname} onChange={onChange} required />
                    </div>

                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'>Leave Date From:</label>
                        <input type="date" name="StleaveFromDate" value={formData.StleaveFromDate} onChange={onChange} required />
                    </div>

                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'>Leave Date To:</label>
                        <input type="date" name="StleaveToDate" value={formData.StleaveToDate} onChange={onChange} required />
                    </div>

                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'>Leave Type:</label>
                        <select name="StleaveType" value={formData.StleaveType} onChange={onChange} required>
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Vacation Leave">Vacation Leave</option>
                            <option value="Personal Leave">Personal Leave</option>
                        </select>
                    </div>

                    <div className="StaffLeave-form-group">
                        <label className='StaffLeave-form-group label'>Reason:</label>
                        <textarea name="streason" value={formData.streason} onChange={onChange}  />
                    </div>

                    <center><button type="submit" className='staffLeaveButton'>Submit</button></center>
                </form>
                <br></br>
        <Footer />
        </>
    );
}

export default StaffLeaveForm;
