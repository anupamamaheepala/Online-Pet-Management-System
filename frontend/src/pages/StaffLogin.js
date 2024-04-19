// export default StaffLogin;
import React, { useState } from 'react';
import axios from 'axios';

const StaffLogin = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    password: '' // Assuming NIC is used as password
  });

  const { staffId, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/staff/login", formData);
      console.log(res.data);
      // Redirect to staff profile page
      window.location.href = `/staff/profile/${res.data.staffId}`;
    } catch (err) {
      console.error(err);
      // Handle login error
    }
  };

  return (
    <div>
      <h2>Staff Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Staff ID:</label>
          <input type="text" name="staffId" value={staffId} onChange={onChange} required />
        </div>
        <div>
          <label>Password (NIC):</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default StaffLogin;
