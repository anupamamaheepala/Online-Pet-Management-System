import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/orderform.css'; // Import the CSS file for styling

const OrderForm = () => {
    const [formData, setFormData] = useState({
        orderName: '',
        orderContactNo: '',
        orderAddress: ''
    });

    const { orderName, orderContactNo, orderAddress } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/orders/od", formData);
            console.log(res.data);
            // Optionally, you can clear the form fields after successful submission
            setFormData({
                orderName: '',  
                orderContactNo: '',
                orderAddress: ''
            });
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.log('Server responded with status:', err.response.status);
                // You can handle different types of errors here
            } else if (err.request) {
                // The request was made but no response was received
                console.log('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error setting up the request:', err.message);
            }
        }
    };
    

    return (
        <>
            <Header />
            <form className="order-form" onSubmit={onSubmit}>
                <h2>Place Your Order</h2>
                <div className="form-group">
                    <label htmlFor="orderName">Name:</label>
                    <input type="text" id="orderName" name="orderName" value={orderName} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="orderContactNo">Contact No:</label>
                    <input type="text" id="orderContactNo" name="orderContactNo" value={orderContactNo} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="orderAddress">Address:</label>
                    <textarea id="orderAddress" name="orderAddress" value={orderAddress} onChange={onChange}></textarea>
                </div>

                <button type="submit" className="submit-button">Place Order</button>
            </form>
            <Footer />
        </>
    );
};

export default OrderForm;
