import React, { useState } from 'react';
import axios from 'axios';
import '../css/payerinfo.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Payerinfo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonenumber: '',
        address: ''
<<<<<<< HEAD
    });
=======
    })
>>>>>>> 689d9c1a15bef84d7bf34df78d088dd78f17a76a

    const {name, email, phonenumber, address} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/payerinfo/pay", formData);
            console.log(res.data);
            setFormData({
                name: '',
                email: '',
                phonenumber: '',
                address: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <>
      <Header />
        <div className="anupayer-info">
            <h2>Payer's Information</h2>
            <form onSubmit={onSubmit}>
                <div className="anuform-group">
                    <label htmlFor="name">Name:</label>
                    <input  
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="anuform-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        email="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="anuform-group">
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <input
<<<<<<< HEAD
                        type="tel"
                        phonenumber="phonenumber"
=======
                        type="text"
                        id="phonenumber"
>>>>>>> 689d9c1a15bef84d7bf34df78d088dd78f17a76a
                        value={phonenumber}
                        onChange={onChange}
                    />
                </div>
                <div className="anuform-group">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        address="address"
                        value={address}
                        onChange={onChange}
                    />
                </div>
                <center><button className="anupfbutton" type="submit">View Status</button></center>
            </form>
        </div>
        <Footer />
        </>
    );
}

export default Payerinfo;


