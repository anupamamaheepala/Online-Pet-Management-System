import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:9000/customer/reset-password', formData);
      console.log(res.data); // Check the response from the server

      // Handle success message or redirect as needed

    } catch (err) {
      console.error(err);
      // Handle error message
    }
  };

  return (
    <>
      <Header />
      <div>
        <div>
          <br />
          <div>
            <h2><center>Reset Password</center></h2>
            <div>
              <form onSubmit={onSubmit}>
                <div>
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input type="password" name="currentPassword" value={currentPassword} onChange={onChange} required />
                </div>
                <div>
                  <label htmlFor="newPassword">New Password:</label>
                  <input type="password" name="newPassword" value={newPassword} onChange={onChange} required />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm New Password:</label>
                  <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit">Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default ResetPassword;
