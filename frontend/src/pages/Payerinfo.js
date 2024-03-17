import React, { useState } from 'react';
import '../css/payerinfo.css';
import Layout from '../components/Layout';

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
        <button type="submit">View Status</button>
        </center>
      </form>
    </div>
    </Layout>
  );
};

export default Payerinfo;

