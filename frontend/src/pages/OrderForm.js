import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/orderform.css';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        orderName: '',
        orderContactNo: '',
        orderAddress: ''
    });

    const { orderName, orderContactNo, orderAddress } = formData;

    const validateContactNo = (number) => {
        // Ensure it contains only digits and has exactly 10 characters
        const phoneNumberPattern = /^[0-9]{10}$/;
        return phoneNumberPattern.test(number);
    };

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'orderContactNo') {
            // Ensure the input is only numbers
            const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-digit characters
            if (numericValue.length > 10) {
                Swal.fire({
                    icon: 'error',
                    title: 'Too Many Digits',
                    text: 'The phone number should be 10 digits long.',
                });
                return;
            }
            setFormData((prevState) => ({
                ...prevState,
                orderContactNo: numericValue, // Keep only numeric characters
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!orderName.trim() || !orderContactNo.trim() || !orderAddress.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Please fill in all required fields.',
            });
            return;
        }

        if (!validateContactNo(orderContactNo)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Please enter a valid 10-digit numeric phone number.',
            });
            return;
        }

        try {
            const res = await axios.post("http://localhost:9000/orders/add", formData);
            console.log(res.data);

            Swal.fire({
                icon: 'success',
                title: 'Order Placed',
                text: 'Your order has been placed successfully!',
            });

            setFormData({
                orderName: '',  
                orderContactNo: '',
                orderAddress: ''
            });
        } catch (err) {
            if (err.response) {
                Swal.fire({
                    icon: 'error',
                    title: `Error: ${err.response.status}`,
                    text: 'There was a problem with the server response.',
                });
            } else if (err.request) {
                Swal.fire({
                    icon: 'error',
                    title: 'No Response',
                    text: 'No response received from the server.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Request Error',
                    text: `Error setting up the request: ${err.message}`,
                });
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
                    <input
                        type="text"
                        id="orderName"
                        name="orderName"
                        value={orderName}
                        onChange={onChange}
                    />
                </div>

                <div class="form-group">
                    <label htmlFor="orderContactNo">Contact No:</label>
                    <input
                        type="tel" // Allows for phone numbers
                        id="orderContactNo"
                        name="orderContactNo"
                        maxLength={10} // Limit to 10 characters
                        value={orderContactNo}
                        onChange={onChange}
                    />
                </div>

                <div class="form-group">
                    <label htmlFor="orderAddress">Address:</label>
                    <textarea
                        id="orderAddress"
                        name="orderAddress"
                        value={orderAddress}
                        onChange={onChange}
                    ></textarea>
                </div>

                <button type="submit" className="submit-button">
                    Place Order
                </button>
            </form>
            <Footer />
        </>
    );
};

export default OrderForm;
