import React, { useState } from 'react';
import axios from 'axios';

const StaffLogin = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    nic: ''
  });

  const { staffId, nic } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:9000/staff/authenticate', formData);
      
      if (response.status === 200) {
        const data = response.data;
        console.log('Authentication successful:', data);
        window.location.href = '/StaffProfile'; // Redirect to StaffProfile page
      } else {
        console.error('Authentication failed');
        // Display error message or handle failure
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      // Handle network errors or other issues
    }
  };
  

  return (
    <div className="staffLoginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='staffLoginForm'>
        <div className="staffLoginForm-group">
          <label htmlFor="staffId">Staff ID</label>
          <input
            type="text"
            id="staffId"
            name="staffId"
            value={staffId}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nic">Password</label>
          <input
            type="password"
            id="nic"
            name="nic"
            value={nic}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StaffLogin;
