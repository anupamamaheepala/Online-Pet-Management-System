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
        address: '',
        purpose: '', // corrected from purposee
        amount: ''   // corrected from emout
    });

    const { name, email, phonenumber, address, purpose, amount } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/payerinfo/pay", formData);
            console.log(res.data);
            // Redirect to PayStatus page after successful form submission
            window.location.href = `/Paystatus?id=${res.data._id}`;

              
            // Optionally, you can clear the form fields after successful submission
            setFormData({
                name: '',
                email: '',
                phonenumber: '',
                address: '',
                purpose: '',
                amount: '',
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
                        <label>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="anuform-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="anuform-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            id="phonenumber"
                            name="phonenumber"
                            value={phonenumber}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="anuform-group">
                        <label>Address:</label>
                        <textarea
                            name="address"
                            id="address"
                            value={address}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="anuform-group">
                        <label>Purpose:</label>
                        <select id="purpose" name="purpose" value={purpose} onChange={onChange}>
                        <option value="" disabled>Select Purpose</option>
                        <option value="Buy products">Buy products</option>
                        <option value="Verterinary appointment">Verterinary appointment</option>
                        <option value="Grooming appointment">Grooming appointment</option>
                        <option value="Pet training appointment">Pet training appointment</option>
                        <option value="Advertisement">Advertisement</option>
                        </select>
                    </div>
                    <div className="anuform-group">
                        <label>Amount:</label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={onChange}
                            required
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

