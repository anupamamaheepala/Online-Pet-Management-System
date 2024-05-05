import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/cardpay.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpay = () => {
    const location = useLocation();
    const [payerId, setPayerId] = useState('');
    const [formData, setFormData] = useState({
        payerId: '',
        nameOnCard: '',
        cardNumber: '',
        cvv: '',
        expireDate: ''
    });

    const { nameOnCard, cardNumber, cvv, expireDate } = formData;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('payerId');
        setPayerId(id);
    }, [location]);

    const onChange = e => {
        const { name, value } = e.target;

        if (name === 'nameOnCard') {
            // Allow only letters and spaces
            if (/^[a-zA-Z\s]*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === 'cardNumber') {
            // Check if the card number starts with 4 or 5
            if (!/^[45]/.test(value.charAt(0))) {
                // Show error alert here
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Card Number',
                    text: 'Card numbers can only start with 4 or 5.'
                });
                return;
            }
    
            // Allow only numbers and add space after every 4 digits
            const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            setFormData({ ...formData, [name]: formattedValue.slice(0, 19) });
        } else if (name === 'cvv') {
            // Allow only numbers and limit to 3 digits
            const formattedValue = value.replace(/\D/g, '');
            setFormData({ ...formData, [name]: formattedValue.slice(0, 3) });
        } else if (name === 'expireDate') {
            // Ensure format is MM/YYYY
            const parts = value.split('/');
            let month = parts[0] || ''; // Default month to empty string
            let year = parts[1] || '';  // Default year to empty string
    
            // Limit month to 1-12
            if (month.length === 1 && parseInt(month, 10) > 1) {
                month = '0' + month; // Prepend '0' to single digit month
            } else if (month.length === 2 && parseInt(month, 10) > 12) {
                month = '12'; // Limit month to 12 if it exceeds 12
            }
    
            // Limit year to two digits
            if (year.length > 2) {
                year = year.substring(0, 2); // Limit year to two digits
            }
    
            // Add "/" after typing two digits for the month
            let updatedValue;
            if (month.length === 2 && !value.includes('/')) {
                updatedValue = month + '/' + year;
            } else {
                // Join month and year with "/"
                updatedValue = `${month}${year ? '/' + year : ''}`;
            }
            setFormData({ ...formData, [name]: updatedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleConfirmPayment = async (e) => {
        e.preventDefault();
        console.log("Confirm payment button clicked."); // Add this line
        try {
            // Basic form validation
            if (!payerId || !nameOnCard || !cardNumber || !cvv || !expireDate) {
                console.error("All fields are required!");
                return;
            }
    
            // Show loading message with timer
            let timerInterval;
            Swal.fire({
                title: "Wait for the payment process",
                html: "Processing... <b></b>",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            });
    
            const res = await axios.post("http://localhost:9000/cardpay/cpay", {
                payerId,
                nameOnCard,
                cardNumber,
                cvv,
                expireDate
            });
    
            console.log(res.data);
            setFormData({
                payerId: '',
                nameOnCard: '',
                cardNumber: '',
                cvv: '',
                expireDate: ''
            });
    
            // After payment is successful, show success alert
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your payment has been successfully processed.'
            });
    
        } catch (err) {
            console.error(err.response.data);
            // Check if error message indicates card has expired
            if (err.response.data.message === "The card has already expired") {
                // Display an alert to the user
                Swal.fire({
                    icon: 'error',
                    title: 'Card Expired',
                    text: 'The card has already expired. Please use a different card.'
                });
            } else {
                // Handle other errors
                console.error(err);
            }
        }
    };
    

    const handleNext = () => {
        window.location.href = `/cardpaysuccess?id=${payerId}`;
    };

    return (
        <>
            <Header />
            <div className="anucard-payment">
                <h2>Card Payment</h2>
                <form onSubmit={handleConfirmPayment}>
                    <div className="payment-method">
                        <input type="radio" name="payment-method" id="method-1" checked />
                        <label htmlFor="method-1" className="payment-method-item">
                            <img src="images/visa.png" alt="" />
                        </label>
                        <input type="radio" name="payment-method" id="method-2" />
                        <label htmlFor="method-2" className="payment-method-item">
                            <img src="images/mastercard.png" alt="" />
                        </label>
                    </div>
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
                            maxLength={19} // Max length considering spaces
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
                            maxLength={3} // Max length of 3 characters
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
                            maxLength={5} // Max length of 5 characters (MM/YY)
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div className="carddivbutton">
                        <button className="anucpbutton" type="submit">Confirm Payment</button>
                        <button className="anucpbutton" type="button" onClick={handleNext}>Next</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Cardpay;
