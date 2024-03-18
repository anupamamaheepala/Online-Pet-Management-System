import React, { useState } from 'react';
import '../css/payerinfo.css';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Payerinfo = ({ onNext }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(userInfo);
  };

  return (
    <Layout>
    <div className="user-info-container">
      <div className="tile"><h1 className='topic'>Payer's Information</h1></div>
      <form className="user-info-form" onSubmit={handleSubmit}>
        <center><input
          type="text"
          name="name"
          placeholder="Name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={userInfo.phoneNumber}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={userInfo.address}
          onChange={handleChange}
          required
        ></textarea>
        <Link to="/Cardpay" className='link'>Card Payment</Link>
        <Link to="/Banktrans" className='link'>Bank Transfer</Link>
        </center>
      </form>
    </div>
    </Layout>
  );
};

export default Payerinfo;

