import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/resetpassword.css';
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
  const [passwordRequirements, setPasswordRequirements] = useState(false);

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

    // Password validation
    if (!validatePassword(formData.newPassword)) {
      setMessage('New password does not meet the requirements.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:9000/customer/reset-password/${customerId}`, {
        existingPassword: formData.existingPassword,
        newPassword: formData.newPassword
      });

      setMessage(res.data.message);

      // Redirect to the sign-in page after successful password reset
      setTimeout(() => {
        window.location.href = '/SignIn';
      }, 3000); 
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Incorrect existing password') {
        setMessage('Existing password is incorrect.');
      } else {
        console.error(error);
        setMessage('Failed to reset password.');
      }
    }
  };

  // Function to validate password
  const validatePassword = (password) => {
    // Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  // Function to show password requirements
  const showPasswordRequirements = () => {
    setPasswordRequirements(true);
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
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} onFocus={showPasswordRequirements} required />
            {passwordRequirements && <p>Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.</p>}
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
