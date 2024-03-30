import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import '../css/StaffLeaveForm.css';

function StaffLeaveForm() {
    return (
        <>
        <Header />
        
        <form className='StaffLeave-Form'>
                <h2>Staff Leave Form</h2>
               
                    <div className="StaffLeave-form-group">
                        <label>Name:</label>
                        <input type="text" name="sname" required />
                    </div>

                    <div className="StaffLeave-form-group">
                        <label>Leave Date From:</label>
                        <input type="date" name="StleaveFromDate" required />
                    </div>

                    <div className="StaffLeave-form-group">
                        <label>Leave Date To:</label>
                        <input type="date" name="StleaveToDate" required />
                    </div>

                    <div className="StaffLeave-form-group">
                        <label>Leave Type:</label>
                        <select name="StleaveType" required>
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Vacation Leave">Vacation Leave</option>
                            <option value="Personal Leave">Personal Leave</option>
                        </select>
                    </div>

                    <div className="StaffLeave-form-group">
                        <label>Reason:</label>
                        <textarea name="streason" required />
                    </div>

                    <center><button type="submit" className='staffLeaveButton'>Submit</button></center>
                </form>
                <br></br>
        <Footer />
        </>
    );
}

export default StaffLeaveForm;
