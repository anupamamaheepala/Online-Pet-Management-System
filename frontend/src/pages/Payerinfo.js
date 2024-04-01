import React, { useState } from 'react';
import '../css/payerinfo.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Payerinfo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        console.log('Form submitted:', { name, email, phone, address });
    };

    return (
      <>
      <Header />
        <div className="anupayer-info">
            <h2>Payer's Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="anuform-group">
                    <label htmlFor="name">Name:</label>
                    <input  
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="anuform-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="anuform-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="anuform-group">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <center><button className="anupfbutton" type="submit">View Status</button></center>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default Payerinfo;


