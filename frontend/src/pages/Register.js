import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contactNumbers: [''],
        address: '',
        password: '',
        confirmPassword: '',
    });

    const { username, email, contactNumbers, address, password, confirmPassword } = formData;

    const handleInputChange = (index, event) => {
        const updatedContactNumbers = [...contactNumbers];
        const value = event.target.value;
        // Validate the contact number
        if (/^\d{0,10}$/.test(value)) {
            updatedContactNumbers[index] = value;
            setFormData({
                ...formData,
                contactNumbers: updatedContactNumbers,
            });
        } else {
            // Alert the user if the input is invalid
            alert("Contact number must be 10 digits long and contain only numbers.");
        }
    };

    const onBlurContactNumber = async (index, event) => {
        const value = event.target.value;
        try {
            const response = await axios.get(`http://localhost:9000/customer/contact-number/${value}`);
            if (response.data) {
                alert("Contact number already exists. Please use a different contact number.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while checking the contact number. Please try again later.");
        }
    };

    const addContactNumberField = () => {
        if (contactNumbers.length < 3) {
            setFormData({
                ...formData,
                contactNumbers: [...contactNumbers, ''],
            });
        } else {
            alert("You can only add up to three contact numbers.");
        }
    };

    const removeContactNumberField = (index) => {
        if (contactNumbers.length > 1) {
            const updatedContactNumbers = contactNumbers.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                contactNumbers: updatedContactNumbers,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please check your password and try again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:9000/customer/register", formData);
            console.log(response.data);

            window.location.href = '/SignIn';

            //  clear the form fields after successful submission
            setFormData({
                username: '',
                email: '',
                contactNumbers: [''],
                address: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Display error message to the user
                alert(error.response.data.message);
            } else {
                console.error(error);
                alert("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <Header />
            <div className="registration-form">
                <h2>Sign Up To PetZone</h2>
                <div className="register-content">
                    <form onSubmit={handleSubmit}>
                        <div className="registration-form-group">
                            <label>Username:</label>
                            <input type="text" name="username" value={username} onChange={handleChange} required />
                        </div>
                        <div className="registration-form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={email} onChange={handleChange} required />
                        </div>
                        <div className="registration-form-group">
                            <label>Address:</label>
                            <input type="text" name="address" value={address} onChange={handleChange} required />
                        </div>
                        <div className="registration-form-group">
                            <label>Contact Numbers:</label>
                            {contactNumbers.map((contactNumber, index) => (
                                <div className="registration-contact-number-group" key={index}>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        pattern="\d{10}"
                                        maxLength={10}
                                        value={contactNumber}
                                        onChange={(event) => handleInputChange(index, event)}
                                        onBlur={(event) => onBlurContactNumber(index, event)}
                                        required
                                    />

                                    <button type="button" onClick={() => removeContactNumberField(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" className="add-contact-number-button" onClick={addContactNumberField} >
                                Add Contact Number
                            </button>
                        </div>

                        <div className="registration-form-group">
                            <label>Password:</label>
                            <input type="password" name="password" value={password} onChange={handleChange} required />
                            <p className="password-requirements">Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
                        </div>
                        <div className="registration-form-group">
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                        </div>
                        <center><button className="registration-button" type="submit">Register</button></center>
                    </form>
                    <br />

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
