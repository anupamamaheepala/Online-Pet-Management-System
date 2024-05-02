import React, { useState } from 'react';
import axios from 'axios';
import passwordValidator from 'password-validator';
import '../css/forgotpassword.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const { email, otp, newPassword, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const schema = new passwordValidator();
  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols();

  const generateOTP = async () => {
    try {
      await axios.post('http://localhost:9000/customer/forgot-password', { email });
      alert('OTP sent to your email');
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post('http://localhost:9000/customer/verify-otp', formData);
      setOtpVerified(true);
      alert('OTP verified successfully. You can now set your new password.');
    } catch (error) {
      console.error(error);
      alert('Invalid OTP');
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (!schema.validate(newPassword)) {
      alert('Password does not meet the requirements');
      return;
    }

    try {
      const passwordResponse = await axios.post('http://localhost:9000/customer/change-password', formData);
      if (passwordResponse.data.message === 'Password changed successfully') {
        alert('Password changed successfully');
        // Redirect to sign-in page
      window.location.href = '/SignIn';
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      console.error(error);
      alert('Error changing password');
    }
  };

  return (
    <>
    <Header />
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label className="forgot-password-label">Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} className="forgot-password-input" required />
        </div>
        <button type="button" className="forgot-password-button" onClick={generateOTP}>Generate OTP</button>
        <div className="form-group">
          <label className="forgot-password-label">OTP:</label>
          <input type="text" name="otp" value={otp} onChange={onChange} className="forgot-password-input" required />
          <button type="button" className="forgot-password-button" onClick={verifyOTP}>Verify OTP</button>
        </div>
        {otpVerified && (
          <div className="password-change-section">
            <label className="forgot-password-label">New Password:</label>
            <input type="password" name="newPassword" value={newPassword} onChange={onChange} className="forgot-password-input" onFocus={() => setShowPasswordRequirements(true)} required />
            {showPasswordRequirements && (
              <div className="requirements">
                <h4 className="requirement-title">Password Requirements:</h4>
                <ul className="requirement-list">
                  <li className="requirement-item">Minimum length: 8 characters</li>
                  <li className="requirement-item">Maximum length: 100 characters</li>
                  <li className="requirement-item">Must have at least one uppercase letter</li>
                  <li className="requirement-item">Must have at least one lowercase letter</li>
                  <li className="requirement-item">Must have at least one digit</li>
                  <li className="requirement-item">Must have at least one special character</li>
                </ul>
              </div>
            )}
            <label className="forgot-password-label">Confirm Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} className="forgot-password-input" required />
            <button type="button" className="forgot-password-button" onClick={changePassword}>Change Password</button>
          </div>
        )}
      </form>
    </div>
    <Footer />
    </>
  );
};

export default ForgotPassword;
