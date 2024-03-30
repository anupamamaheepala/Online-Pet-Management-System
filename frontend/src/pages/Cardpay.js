import React, { useState } from 'react';
import '../css/cardpay.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpay = () => {
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expireDate, setExpireDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        console.log('Form submitted:', { nameOnCard, cardNumber, cvv, expireDate });
    };

    return (
      <>
      <Header />
        <div className="anucard-payment">
            <h2>Card Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="anucpform-group">
                    <label htmlFor="nameOnCard">Name on Card:</label>
                    <input
                        type="text"
                        id="nameOnCard"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                    />
                </div>
                <div className="anucpform-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div className="anucpform-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
                <div className="anucpform-group">
                    <label htmlFor="expireDate">Expiration Date:</label>
                    <input
                        type="text"
                        id="expireDate"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                    />
                </div>
                <center><button className="anucpbutton" type="submit">Confirm Payment</button></center>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default Cardpay;
