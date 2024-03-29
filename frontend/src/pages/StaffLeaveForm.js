import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import '../css/StaffLeaveForm.css';

function StaffLeaveForm() {
    return (
        <>
        <Header />
        
        <form>
                <h2>Staff Leave Form</h2>
               
                    <div className="input_box">
                        <label>Name:</label>
                        <input type="text" name="name" required />
                    </div>
                    <div className="input_box">
                        <label>Leave Date From:</label>
                        <input type="date" name="leaveFromDate" required />
                    </div>
                    <div className="input_box">
                        <label>Leave Date To:</label>
                        <input type="date" name="leaveToDate" required />
                    </div>
                    <div className="input_box">
                        <label>Leave Type:</label>
                        <select name="leaveType" required>
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Vacation Leave">Vacation Leave</option>
                            <option value="Personal Leave">Personal Leave</option>
                        </select>
                    </div>
                    <div className="input_box">
                        <label>Reason:</label>
                        <textarea name="reason" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
        <Footer />
        </>
    );
}

export default StaffLeaveForm;
