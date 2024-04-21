// export default StaffLogin;
import React, { useState } from 'react';
import axios from 'axios';
import '../css/staffLogin.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const StaffLogin = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    password: '' // Assuming NIC is used as password
  });

  const [error, setError] = useState('');
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
      setError('Invalid credentials. Please try again.');

    }
  };

  return (
    <>
    <Header/>
    <div className='staffLoginContainer' >
      <h2>Staff Login</h2>
      <br></br>
      <form onSubmit={onSubmit} className='staffLoginForm'>
        <div className='staffLogin'>
          <label className='staffLogin-label'>Staff ID:</label>
          <input type="text" name="staffId" className='staffId' value={staffId} onChange={onChange} required />
        </div>
        <div>
          <label className='staffLogin-label'>Password:</label>
          <input type="password" name="password" className='staffpassword' value={password} onChange={onChange} required />
        </div>
        <button type="submit" className='StaffLogin'>Login</button>
        {error && <p className="staffloginerror">{error}</p>}
      </form>
    </div>
   <Footer />
   </>

  );
}

export default StaffLogin;
