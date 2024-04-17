import React, { useState } from 'react';
import '../css/cardpay.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpay = () => {
    const [formData, setFormData] = useState({
        nameOnCard: '',
        cardNumber: '',
        cvv: '',
        expireDate: ''
    });

    const { nameOnCard, cardNumber, cvv, expireDate } = formData;

    const onChange = e => {
        const { name, value } = e.target;

        let updatedValue = value;

        if (name === 'cardNumber') {
            // Remove any non-numeric characters
            updatedValue = value.replace(/\D/g, '');
            // Insert space after every four digits
            updatedValue = updatedValue.replace(/(.{4})/g, '$1 ').trim();
            // Limit to 16 characters
            updatedValue = updatedValue.substring(0, 19); // 16 digits + 3 spaces
        } else if (name === 'cvv') {
            // Remove any non-numeric characters
            updatedValue = value.replace(/\D/g, '');
            // Limit to 3 characters
            updatedValue = updatedValue.substring(0, 3);
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
            if (month.length === 2 && !value.includes('/')) {
                updatedValue = month + '/' + year;
            } else {
                // Join month and year with "/"
                updatedValue = `${month}${year ? '/' + year : ''}`;
            }
        }

        setFormData({ ...formData, [name]: updatedValue });
    };

    const onSubmit = async e => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Basic form validation
            if (!nameOnCard || !cardNumber || !cvv || !expireDate) {
                console.error("All fields are required!");
                return;
            }

            const res = await axios.post("http://localhost:9000/cardpay/cpay", formData);
            console.log(res.data);
            setFormData({
                nameOnCard: '',
                cardNumber: '',
                cvv: '',
                expireDate: ''
            });

            // Show first alert
            let timerInterval;
            Swal.fire({
              title: "Please wait for process the payment",
              html: "processing <b></b>",
              timer: 3000,
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
            }).then(() => {
              // Show second alert
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Payment was Successful",
                showConfirmButton: false,
                timer: 3000
              });
            });

        } catch (err) {
            console.error(err);
        }
    };

    const handleConfirmPayment = async (e) => {
        e.preventDefault(); // Prevent default button behavior
        onSubmit(e); // Call onSubmit function to handle form submission
    };

    const handleNext = () => {
        // Redirect to Cardpaysuccess.js file
        window.location.href = '/cardpaysuccess';
    };

    return (
        <>
            <Header />
            <div className="anucard-payment">
                <h2>Card Payment</h2>
                <form onSubmit={onSubmit}>
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
                        <button className="anucpbutton" type="button" onClick={e => handleConfirmPayment(e)}>Confirm Payment</button>
                        <button className="anucpbutton" type="button" onClick={handleNext}>Next</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Cardpay;
