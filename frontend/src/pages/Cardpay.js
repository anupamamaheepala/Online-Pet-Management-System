import React, { useState } from 'react';
import '../css/cardpay.css';
import Layout from '../components/Layout';

const Cardpay = ({ onNext }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expireDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(paymentInfo);
  };

  return (
    <Layout>
    <div className="card-payment-container">
    <div className="tile"><h1 className='topic'>Card Payment</h1></div>
      <form className="card-payment-form" onSubmit={handleSubmit}>
      
        
        <center><input
          type="text"
          name="nameOnCard"
          placeholder="Name on Card"
          value={paymentInfo.nameOnCard}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentInfo.cvv}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expireDate"
          placeholder="Expire Date"
          value={paymentInfo.expireDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Payment</button></center>
      </form>
    </div>
    </Layout>
  );
};

export default Cardpay;
