import Layout from '../components/Layout';
import React from 'react';
import '../css/StaffRegister.css';

function StaffRegistrationForm() {
  return (
    
<Layout>
    <div className="wrap">
      <div className="StaffRegister">
        <h2>Register Staff Members</h2>
        <form action="#" method="post" id="sform">
          <div className="input_box">
            <label>Name</label>
            <input type="text" placeholder="Enter Name" required id="na" />
          </div>
          <div className="input_box">
            <label>E-mail</label>
            <input type="email" placeholder="Enter Email" required id="na" />
          </div>
          <div className="input_box">
            <label>Contact Number</label>
            <input type="tel" placeholder="Enter Contact Number" required id="na" />
          </div>
          <div className="input_box">
            <label>Address</label>
            <input type="text" placeholder="Enter Address" required id="na" />
          </div>
          <div className="input_box">
            <label>Designation</label>
            <input type="text" placeholder="Enter Designation" required id="na" />
          </div>
          <div className="input_box">
            <label>Educational Qualifications:</label>
            <textarea name="Enter Qualifications" required />
            </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </Layout>
  );
}

export default StaffRegistrationForm;
