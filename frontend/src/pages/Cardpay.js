import React, { useState } from 'react';
import '../css/cardpay.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpay = () => {
    const [formData, setFormData] = useState({
        nameOnCard: '',
        cardNumber: '',
        cvv: '',
        expireDate: ''
    });

    const {nameOnCard, cardNumber, cvv, expireDate} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/cardpay/cpay", formData);
            console.log(res.data);
            setFormData({
                nameOnCard: '',
                cardNumber: '',
                cvv: '',
                expireDate: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <>
      <Header />
        <div className="anucard-payment">
            <h2>Card Payment</h2>
            <form onSubmit={onSubmit}>
                <div className="anucpform-group">
                    <label>Name on Card:</label>
                    <input
                        type="text"
                        name="nameOnCard"
                        id="nameOnCard"
                        value={nameOnCard}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="anucpform-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="anucpform-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        id="cvv"
                        value={cvv}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="anucpform-group">
                    <label htmlFor="expireDate">Expiration Date:</label>
                    <input
                        type="text"
                        name="expireDate"
                        id="expireDate"
                        value={expireDate}
                        onChange={onChange}
                        required
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
