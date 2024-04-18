import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/resetpassword.css'; // Import the CSS file
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const { customerId } = useParams();
  const [formData, setFormData] = useState({
    existingPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage('New password and confirm new password must match.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:9000/customer/reset-password/${customerId}`, {
        existingPassword: formData.existingPassword,
        newPassword: formData.newPassword
      });

      setMessage(res.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Incorrect existing password') {
        setMessage('Existing password is incorrect.');
      } else {
        console.error(error);
        setMessage('Failed to reset password.');
      }
    }
  };

  return (
    <>
      <Header />
      <br></br>
    <div className="ResetPasswordContainer">
      <h2>Reset Password</h2>
      <form className="ResetPasswordForm" onSubmit={handleSubmit}>
        <div>
          <label>Existing Password:</label>
          <input type="password" name="existingPassword" value={formData.existingPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="ResetPasswordMessage">{message}</p>}
    </div>
    <br></br>
    <Footer />
    </>
  );
};

export default ResetPassword;
