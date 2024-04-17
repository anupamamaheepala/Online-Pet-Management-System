import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/editpayinfo.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Paystatus = () => {
  const [payerInfo, setPayerInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(true); // Display update form initially
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    purpose: '',
    amount: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        if (!id) {
          console.error('No ID parameter found in URL');
          return;
        }
        const response = await axios.get(`http://localhost:9000/payerinfo/${id}`);
        setPayerInfo(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phonenumber: response.data.phonenumber,
          address: response.data.address,
          purpose: response.data.purpose,
          amount: response.data.amount
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:9000/payerinfo/${payerInfo._id}`, formData);
      console.log(res.data);
      setPayerInfo(res.data);
      setShowUpdateForm(false);
      window.location.href = `/Paystatus?id=${payerInfo._id}`;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Header />
    <div className="upanupayer-info">
      <h2>Update Payer's Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {showUpdateForm ? (
            <form onSubmit={onSubmit}>
              <div className="upanuform-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="upanuform-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="upanuform-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="upanuform-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={onChange}
                  required
                ></textarea>
              </div>
              <div className="upanuform-group">
                <label>Purpose:</label>
                <select id="purpose" name="purpose" value={formData.purpose} onChange={onChange} required> 
                        <option value="" disabled>Select Purpose</option>
                        <option value="Buy products">Buy products</option>
                        <option value="Verterinary appointment">Verterinary appointment</option>
                        <option value="Grooming appointment">Grooming appointment</option>
                        <option value="Pet training appointment">Pet training appointment</option>
                        <option value="Advertisement">Advertisement</option>
                </select>
              </div>
              <div className="upanuform-group">
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={onChange}
                  required
                />
              </div>
              <center><button className="anuupbutton" type="submit">Update</button></center>
            </form>
          ) : null}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Paystatus;
